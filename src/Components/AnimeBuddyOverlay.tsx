"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  idleImages?: string[];
  runImages?: string[];
  baseSize?: number;
  onClick?: () => void;
  imageSrc?: string; // compatibility with wrapper
  size?: number; // fixed size override
};

/**
 * AnimeBuddyOverlay component
 * ---------------------------
 * Independent anime character overlay that can be dragged and clicked.
 * onClick prop is used to trigger external actions (like opening a chat).
 */
export default function AnimeBuddyOverlay({
  idleImages = ["/cat.gif", "/cat_dance.gif", "/cat_yay.gif", "/cat_fire.gif"],
  runImages = ["/cat_run.gif", "/cat_jump.gif"],
  baseSize = 70,
  onClick,
  imageSrc,
  size: sizeProp,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pos = useRef<{ x: number; y: number }>({ x: 100, y: 100 });
  const prevPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const target = useRef<{ x: number; y: number }>({ x: 100, y: 100 });
  const moving = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const lastMoveTime = useRef<number>(0);
  const waitTime = useRef<number>(0);
  const [isMoving, setIsMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [idleImage, setIdleImage] = useState<string>(imageSrc || idleImages[0]);
  const [runImage, setRunImage] = useState<string>(runImages[0]);
  const [spriteSize, setSpriteSize] = useState<number>(sizeProp ?? baseSize * 0.9);
  const [dragging, setDragging] = useState<boolean>(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const didDrag = useRef<boolean>(false);
  const startPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  // Responsive sizing and initial placement
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      const base = sizeProp ?? baseSize;
      const computed = isMobile ? base * 0.5 : base;
      setSpriteSize(computed);
      pos.current.x = clamp(pos.current.x, 0, window.innerWidth - computed);
      pos.current.y = clamp(pos.current.y, 0, window.innerHeight - computed);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    pos.current.x = 30;
    pos.current.y = (window.innerHeight || 800) - spriteSize - 40;
    return () => window.removeEventListener("resize", handleResize);
  }, [baseSize, sizeProp]);

  // Autonomous movement loop
  useEffect(() => {
    const chooseNewTarget = () => {
  const maxX = (window.innerWidth || window.screen.width) - spriteSize - 6;
  const maxY = (window.innerHeight || window.screen.height) - spriteSize - 6;
      target.current.x = Math.random() * maxX;
      target.current.y = Math.random() * maxY;
      setFacingRight(target.current.x >= pos.current.x);
      setRunImage(runImages[Math.floor(Math.random() * runImages.length)]);
      moving.current = true;
      setIsMoving(true);
      lastMoveTime.current = performance.now();
      waitTime.current = 3000 + Math.random() * 2000;
    };

    const step = (t: number) => {
      const now = performance.now();
      if (!dragging) {
        if (!moving.current && now - lastMoveTime.current > waitTime.current) chooseNewTarget();
        if (moving.current) {
          const dx = target.current.x - pos.current.x;
          const dy = target.current.y - pos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const speed = Math.max(window.innerWidth, window.innerHeight) * 0.002;
          if (dist > speed) {
            pos.current.x += (dx / dist) * speed;
            pos.current.y += (dy / dist) * speed;
          } else {
            pos.current.x = target.current.x;
            pos.current.y = target.current.y;
            moving.current = false;
            setIsMoving(false);
            setIdleImage(imageSrc || idleImages[Math.floor(Math.random() * idleImages.length)]);
            lastMoveTime.current = now;
          }
        }
      }
      if (ref.current) {
        const tilt = clamp((target.current.x - pos.current.x) * 0.03, -10, 10);
        const bob = Math.sin(t / 500) * 3;
        ref.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + bob}px, 0) rotate(${tilt}deg)`;
        ref.current.style.willChange = "transform";
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [spriteSize, idleImages, runImages, dragging, imageSrc]);

  // Dragging and click handlers
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      el.setPointerCapture?.(e.pointerId);
      didDrag.current = false;
      setDragging(true);
      setIsMoving(false);
      moving.current = false;
      dragOffset.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y };
      prevPointer.current = { x: e.clientX, y: e.clientY };
      startPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
  const desiredX = clamp(e.clientX - dragOffset.current.x, 0, window.innerWidth - spriteSize);
  const desiredY = clamp(e.clientY - dragOffset.current.y, 0, window.innerHeight - spriteSize);
      const lerp = 0.25;
      pos.current.x += (desiredX - pos.current.x) * lerp;
      pos.current.y += (desiredY - pos.current.y) * lerp;
      const dx = e.clientX - prevPointer.current.x;
      if (Math.abs(dx) > 2) setFacingRight(dx >= 0);
      prevPointer.current = { x: e.clientX, y: e.clientY };
      const movedDist = Math.hypot(e.clientX - startPointer.current.x, e.clientY - startPointer.current.y);
      if (movedDist > 6) didDrag.current = true; // threshold to count as drag
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      setDragging(false);
      el.releasePointerCapture?.(e.pointerId);
      lastMoveTime.current = performance.now();
    };

    const onClickHandler = (e: MouseEvent) => {
      if (didDrag.current) {
        e.preventDefault();
        e.stopPropagation();
        return; // suppress click after a drag
      }
      if (!dragging && onClick) onClick();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("click", onClickHandler);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("click", onClickHandler);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, spriteSize, onClick]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] overflow-visible">
      <div
        ref={ref}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: spriteSize + "px",
          height: spriteSize + "px",
          transform: `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`,
          willChange: "transform",
          pointerEvents: "auto",
          userSelect: "none",
          zIndex: 9999,
          cursor: dragging ? "grabbing" : "grab",
        }}
      >
        <img
          src={isMoving ? runImage : idleImage}
          alt="anime-buddy"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.28))",
            transformOrigin: "50% 60%",
            pointerEvents: "none",
            transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
          }}
        />
      </div>
    </div>
  );
}
