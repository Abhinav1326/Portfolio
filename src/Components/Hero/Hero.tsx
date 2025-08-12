"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaNodeJs } from "react-icons/fa";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

export default function Hero() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e5ec] to-[#f1f3f6] px-6 overflow-hidden"
    >
      {/* Particles Background */}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "transparent" },
            fpsLimit: 60,
            particles: {
              color: { value: "#9aa0a6" },
              move: { enable: true, speed: 0.4 },
              number: { value: 25 },
              opacity: { value: 0.2 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
          }}
          className="absolute inset-0"
        />
      )}

      {/* Floating Glass Blob */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-[8px_8px_16px_#a3b1c6,_-8px_-8px_16px_#ffffff]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Another Glass Blob */}
      <motion.div
        className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff]"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Abhi
            </span>
            👋
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-md">
            I’m a full-stack developer specializing in React, Next.js, and Python.
            I build modern, smooth, and performance-driven web experiences.
          </p>

          {/* CTA Button */}
          <motion.a
            href="#projects"
            className="inline-block px-6 py-3 rounded-xl bg-[#e0e5ec] shadow-[8px_8px_16px_#a3b1c6,_-8px_-8px_16px_#ffffff] border border-[#f1f3f6] font-semibold text-gray-700 hover:shadow-[inset_8px_8px_16px_#a3b1c6,_inset_-8px_-8px_16px_#ffffff] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
          </motion.a>
        </div>

        {/* Right Side Tech Icons */}
        <div className="flex gap-6">
          {[{ icon: FaReact, color: "text-blue-400" },
            { icon: FaPython, color: "text-yellow-500" },
            { icon: FaNodeJs, color: "text-green-500" }].map((tech, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              whileHover={{ rotate: [0, 5, -5, 0], scale: 1.1 }}
              className="p-4 rounded-2xl bg-[#e0e5ec] shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff] border border-[#f1f3f6] cursor-pointer"
            >
              <tech.icon className={`text-4xl ${tech.color}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
