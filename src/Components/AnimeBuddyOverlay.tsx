"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * AnimeBuddyOverlay
 * -----------------
 * This component overlays the page with a cute anime character (gif)
 * that moves around the screen independently but can also be dragged by the mouse or touch.
 *
 * Fixes made for drag & drop:
 * - Use Pointer Events (pointerdown/pointermove/pointerup) so desktop + touch both work.
 * - Attach pointerdown to the character container (ref.current) instead of checking e.target === img.
 * - Use pointer capture so the pointer continues to drive dragging even if it leaves the element.
 * - Smooth the dragging movement slightly for a natural feel.
 */

type Props = {
  idleImages?: string[];
  runImages?: string[];
  baseSize?: number; // fallback if `size` (prop) isn't provided
  imageSrc?: string; // optional initial/idle image override
  size?: number; // external base size override used for responsive sizing
};

export default function AnimeBuddyOverlay({
  idleImages = ["/cat.gif", "/cat_dance.gif", "/cat_yay.gif"],
  runImages = ["/cat_run.gif", "/cat_jump.gif"],
  baseSize: baseSizeProp = 70,
  imageSrc,
  size: propSize,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pos = useRef<{ x: number; y: number }>({ x: 100, y: 100 });
  const prevPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const target = useRef<{ x: number; y: number }>({ x: 100, y: 100 });
  const moving = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastMoveTime = useRef(0);
  const waitTime = useRef(0);
  const [isMoving, setIsMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [idleImage, setIdleImage] = useState(imageSrc ?? idleImages[0]);
  const [runImage, setRunImage] = useState(runImages[0]);
  // Internal rendered sprite size; derive from provided prop `size` (preferred) or `baseSize` fallback
  const base = propSize ?? baseSizeProp;
  const [spriteSize, setSpriteSize] = useState(base * 0.7);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  useEffect(() => {
    const computeSize = () => (window.innerWidth < 640 ? base * 0.6 : base * 1);
    const onResize = () => {
      const next = computeSize();
      // Re-clamp position when resizing for responsiveness
      pos.current.x = clamp(pos.current.x, 0, window.innerWidth - next);
      pos.current.y = clamp(pos.current.y, 0, window.innerHeight - next);
      setSpriteSize(next);
    };

    window.addEventListener("resize", onResize);

    // initial
    const initial = computeSize();
    setSpriteSize(initial);
    pos.current.x = 30;
    pos.current.y = (window.innerHeight || 800) - initial - 40;

    return () => window.removeEventListener("resize", onResize);
  }, [base]);

  useEffect(() => {
  const chooseNewTarget = () => {
      const maxX = (window.innerWidth || window.screen.width) - spriteSize - 6;
      const maxY = (window.innerHeight || window.screen.height) - spriteSize - 6;

      target.current.x = Math.random() * maxX;
      target.current.y = Math.random() * maxY;

      // Update facing direction based on target
      setFacingRight(target.current.x >= pos.current.x);

      // Randomly pick a running image
      setRunImage(runImages[Math.floor(Math.random() * runImages.length)]);

      moving.current = true;
      setIsMoving(true);
      lastMoveTime.current = performance.now();
      waitTime.current = 3000 + Math.random() * 2000; // 3–5 sec wait after arriving
    };

  const step = (t: number) => {
      const now = performance.now();

      if (!dragging) {
        if (!moving.current && now - lastMoveTime.current > waitTime.current) {
          chooseNewTarget();
        }

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
            setIdleImage(
              idleImages[Math.floor(Math.random() * idleImages.length)]
            );
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

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spriteSize, idleImages, runImages, dragging]);

  // Dragging Handlers (pointer events used for touch + mouse)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      // only primary button
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      // capture pointer so moves outside the element still track
      try {
        el.setPointerCapture?.(e.pointerId);
      } catch {}

      setDragging(true);
      setIsMoving(false);
      moving.current = false;

      // record offset between pointer and top-left of character
      dragOffset.current = {
        x: e.clientX - pos.current.x,
        y: e.clientY - pos.current.y,
      };

      prevPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      // desired position (clamped)
      const desiredX = clamp(e.clientX - dragOffset.current.x, 0, window.innerWidth - spriteSize);
      const desiredY = clamp(e.clientY - dragOffset.current.y, 0, window.innerHeight - spriteSize);

      // smooth following for a more natural feel (tweak factor if you want snappier behavior)
      const lerp = 0.25;
      pos.current.x += (desiredX - pos.current.x) * lerp;
      pos.current.y += (desiredY - pos.current.y) * lerp;

      // update facing direction based on pointer movement
      const dx = e.clientX - prevPointer.current.x;
      if (Math.abs(dx) > 2) setFacingRight(dx >= 0);
      prevPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      setDragging(false);
      // release pointer capture
      try {
        el.releasePointerCapture?.(e.pointerId);
      } catch {}
      // resume autonomous movement after a short delay
      lastMoveTime.current = performance.now();
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, spriteSize]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-visible"
    >
      <div
        ref={ref}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: spriteSize + "px",
          height: spriteSize + "px",
          transform: `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)` ,
          willChange: "transform",
          pointerEvents: "auto", // allow pointer on inner container
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
            pointerEvents: "none", // keep image non-interactive so the container handles pointerdown
            transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
          }}
        />
      </div>
    </div>
  );
}