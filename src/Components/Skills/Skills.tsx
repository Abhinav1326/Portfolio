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

// Categorized skills
const categorizedSkills = {


  "Programming Languages": [
    { name: "Python", icon: <FaPython className="text-yellow-400" /> },
    { name: "C/C++", icon: <SiCplusplus className="text-blue-500" /> },
    { name: "Java", icon: <FaJava className="text-red-500" /> },
  ],
  "Frontend": [
    { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <SiCss3 className="text-blue-500" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
    { name: "ReactJS", icon: <FaReact className="text-sky-500" /> },
    { name: "React Native", icon: <FaReact className="text-sky-500" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
    { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> },
  ],
  "Backend": [
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
  ],

  "Databases": [
    { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
    { name: "Firestore", icon: <SiFirebase className="text-yellow-500" /> },
  ],
  "Tools & Version Control": [
    { name: "Git", icon: <FaGitAlt className="text-orange-400" /> },
    { name: "GitHub", icon: <FaGitAlt className="text-black" /> },
  ],
  "Cloud": [
    { name: "AWS", icon: <FaAws className="text-orange-500" /> },
  ]
};

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
      className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#e0e5ec] to-[#f1f3f6] px-6 py-12 overflow-hidden"
      ref={containerRef}
    >
      {/* Floating Glass Blobs */}
      <motion.div
        className="absolute w-60 h-60 rounded-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl"
        style={{ top: `calc(15% + ${scrollY * 0.1}px)`, left: "8%" }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-white/20 backdrop-blur-lg border border-white/40 shadow-xl"
        style={{ bottom: `calc(10% - ${scrollY * 0.15}px)`, right: "12%" }}
      />

      {/* Section Heading */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10 relative z-10"
      >
        My Skills
      </motion.h2>

      {/* Categorized Skills */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {Object.entries(categorizedSkills).map(([category, skills], idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col"
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
              {category}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/40 backdrop-blur-lg border border-white/50 
                       shadow-[3px_3px_6px_#a3b1c6,_-3px_-3px_6px_#ffffff] 
                       hover:shadow-md transition hover:scale-105"
                >
                  <div className="text-xl mb-1">{skill.icon}</div>
                  <p className="text-gray-800 text-xs font-medium text-center">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
