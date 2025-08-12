"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaReact, FaPython, FaNodeJs, FaDatabase } from "react-icons/fa";

export default function About() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e5ec] to-[#f1f3f6] px-6 overflow-hidden"
    >
      {/* Floating background orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ top: "10%", left: "15%" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ bottom: "5%", right: "10%" }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Tilt Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              x.set(e.clientX - rect.left - rect.width / 2);
              y.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            className="relative w-64 h-64 rounded-2xl overflow-hidden backdrop-blur-lg bg-white/20 border border-white/30 shadow-[8px_8px_16px_#a3b1c6,_-8px_-8px_16px_#ffffff] transition-transform"
          >
            <img
              src="/Photo.jpg"
              alt="Abhi"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Right Side - Text & Skills */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg">
            I’m Abhi — a full-stack developer passionate about crafting modern, smooth, and high-performance web applications. 
            With expertise in <strong>React, Next.js, Python, and Node.js</strong>, I blend creative design with clean code.
          </p>

          {/* Skills */}
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            {[
              { icon: <FaReact className="text-blue-400 text-2xl" />, label: "React / Next.js" },
              { icon: <FaPython className="text-yellow-500 text-2xl" />, label: "Python" },
              { icon: <FaNodeJs className="text-green-500 text-2xl" />, label: "Node.js" },
              { icon: <FaDatabase className="text-purple-500 text-2xl" />, label: "Databases" },
            ].map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.08, boxShadow: "0px 0px 15px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e0e5ec] border border-[#f1f3f6] shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff] cursor-pointer"
              >
                {skill.icon}
                <span className="text-gray-700 font-medium">{skill.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
