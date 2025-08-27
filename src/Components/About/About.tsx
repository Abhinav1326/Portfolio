"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

export default function About() {
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

      <div className="max-w-6xl my-10 mx-auto grid md:grid-cols-2 gap-12 items-start relative z-10">
        {/* Left Side - Image + Quick Info + Buttons + Socials */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Profile Image */}
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden backdrop-blur-lg bg-white/20 border border-white/30 shadow-[8px_8px_16px_#a3b1c6,_-8px_-8px_16px_#ffffff]">
            <img
              src="/Photo.jpg"
              alt="Abhinav"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Info Section */}
          <div className="w-full p-5 rounded-2xl bg-[#e0e5ec] border border-[#f1f3f6] shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff] text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Abhinav Raosaheb Gore
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Full-Stack Developer | MERN | Python
            </p>
            <p className="text-gray-600 text-sm">
              📞 +91 8530684793 <br />
              📧 abhinavrbgore13@gmail.com
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="/Abhi Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 text-white font-medium shadow-lg hover:scale-105 transition"
            >
              <FiDownload /> Download Resume
            </a>
            <a
              href="#projects"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium shadow-lg hover:scale-105 transition"
            >
              View Projects
            </a>
          </div>

          {/* Socials */}
          <div className=" text-center">
            <p className="text-gray-600 mb-2">Let’s connect 👇</p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/abhinavgore13/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 shadow hover:scale-110 transition"
              >
                <FaLinkedin className="text-blue-600 text-2xl" />
              </a>
              <a
                href="https://github.com/Abhinav1326"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 shadow hover:scale-110 transition"
              >
                <FaGithub className="text-gray-800 text-2xl" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Details */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Me
          </h2>

          <p className="text-gray-600 mb-6 max-w-lg">
            Hi, I’m <span className="font-semibold">Abhinav Raosaheb Gore</span>{" "}
            — a full-stack developer passionate about crafting modern, smooth,
            and high-performance applications. With expertise in{" "}
            <strong>React, Next.js, Python, and Node.js</strong>, I love
            blending creative design with clean code. Outside coding, I enjoy
            exploring new technologies, solving challenges, and building things
            that make life easier.
          </p>

          {/* Education */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
            <li>
              <strong>B.E. (Information Technology)</strong>, Sinhgad Institute
              of Technology, Lonavala (2021-2025) — CGPA: 8.52
            </li>
            <li>
              <strong>HSC</strong>, Mahatma Gandhi Junior College (2021) —
              83.33%
            </li>
            <li>
              <strong>SSC</strong>, Vidya Vikas Public School (2019) — 76.00%
            </li>
          </ul>

          {/* Certifications */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Certifications
          </h3>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Google IT Automation with Python (Coursera)</li>
            <li>AWS Cloud Practitioner Essentials (Coursera)</li>
            <li>Introduction to Git & GitHub (Coursera)</li>
            <li>Crash Course on Python (Coursera)</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
