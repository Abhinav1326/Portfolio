"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaAws 
} from "react-icons/fa";
import { 
  SiMongodb, SiMysql, SiJavascript, SiHtml5, SiCss3, 
  SiTailwindcss, SiBootstrap, SiFirebase, SiCplusplus
} from "react-icons/si";

const skills = [
  { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <SiCss3 className="text-blue-500" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
  { name: "ReactJS", icon: <FaReact className="text-sky-500" /> },
  { name: "MERN Stack", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Python", icon: <FaPython className="text-yellow-400" /> },
  { name: "C/C++", icon: <SiCplusplus className="text-blue-500" /> },
  { name: "Java", icon: <FaJava className="text-red-500" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-400" /> },
  { name: "GitHub", icon: <FaGitAlt className="text-black" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
  { name: "Firestore", icon: <SiFirebase className="text-yellow-500" /> },
  { name: "AWS", icon: <FaAws className="text-orange-500" /> },
  { name: "React Native", icon: <FaReact className="text-sky-500" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> },
];

export default function Skills() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#e0e5ec] to-[#f1f3f6] px-4 py-4 overflow-hidden"
      
      ref={containerRef}
    >
      {/* Floating Glass Blobs */}
      <motion.div
        className="absolute w-60 h-60 rounded-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl"
        style={{
          top: `calc(15% + ${scrollY * 0.1}px)`,
          left: "8%",
        }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-white/20 backdrop-blur-lg border border-white/40 shadow-xl"
        style={{
          bottom: `calc(10% - ${scrollY * 0.15}px)`,
          right: "12%",
        }}
      />

      {/* Section Heading */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 relative z-10"
      >
        My Skills
      </motion.h2>

      {/* Skills Grid - Compact Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 relative z-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/40 backdrop-blur-lg border border-white/50 
                       shadow-[4px_4px_8px_#a3b1c6,_-4px_-4px_8px_#ffffff] 
                       hover:shadow-lg transition hover:scale-105"
          >
            <div className="text-3xl mb-2">{skill.icon}</div>
            <p className="text-gray-800 text-sm font-medium text-center">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
