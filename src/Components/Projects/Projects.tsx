"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function Projects() {
  const projects = [
    {
      title: "Real-Time Job Seeker Automation",
      link: "https://github.com/Abhinav1326/BE-Final-Year-Project",
      description:
        "Automated system to streamline job applications, reducing time spent manually applying. Includes filters and approval system.",
      tech: ["React", "JavaScript", "ML", "Web API", "Puppeteer", "NodeJS", "Python"],
    },
    {
      title: "AI Based Personal Voice Assistant (Veronica)",
      link: "https://github.com/Abhinav1326/Veronica-Personal-Voice-Assistant-",
      description:
        "AI-powered assistant with assignment writing, advice, internet search, and bug fixing. Uses GPT-4 for personalized responses.",
      tech: ["Python", "AI", "ML", "OpenCV", "Selenium", "API"],
    },
    {
      title: "Mobile Chat Application",
      link: "https://github.com/Abhinav1326/Mobile-Chat-Application",
      description:
        "Chat app with React Native, Expo, Firebase, and Firestore for real-time messaging and responsive UI.",
      tech: ["React Native", "Expo", "Firebase", "Firestore"],
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-gradient-to-br from-[#e0e5ec] to-[#f1f3f6] px-6 py-20 overflow-hidden"
    >
      {/* Floating Blobs Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-2/3 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"
          animate={{ x: [0, -80, 80, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-[8px_8px_16px_#a3b1c6,_-8px_-8px_16px_#ffffff] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-[#e0e5ec] border border-[#f1f3f6] shadow-[4px_4px_8px_#a3b1c6,_-4px_-4px_8px_#ffffff] text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FaGithub size={22} />
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FaExternalLinkAlt size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
