"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e5ec] to-[#f1f3f6] px-6 overflow-hidden"
        >
            {/* Floating Orbs */}
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
                {/* Left Side - Title + Description + Socials */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Get in Touch
                    </h2>
                    <p className="text-gray-600 max-w-md">
                        I’d love to connect! Whether you want to discuss opportunities,
                        collaborate on a project, or just say hi — feel free to reach out.
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-[#e0e5ec] border border-[#f1f3f6] shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff] flex items-center gap-4">
                            <FaEnvelope className="text-blue-500 text-xl" />
                            <span className="text-gray-700">abhinavrbgore13@gmail.com</span>
                        </div>
                        <div className="p-5 rounded-2xl bg-[#e0e5ec] border border-[#f1f3f6] shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff] flex items-center gap-4">
                            <FaPhoneAlt className="text-green-500 text-xl" />
                            <span className="text-gray-700">+91 8530684793</span>
                        </div>
                        <div className="p-5 rounded-2xl bg-[#e0e5ec] border border-[#f1f3f6] shadow-[6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff] flex items-center gap-4">
                            <FaMapMarkerAlt className="text-red-500 text-xl" />
                            <span className="text-gray-700">Gavthan Rajuri, Rahata, Ahmednagar - 413737 <br /> Maharashtra, India</span>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="mt-4">
                        <p className="text-gray-600 mb-2">Let’s connect 👇</p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.linkedin.com/in/abhinavgore13/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 shadow hover:scale-105 transition"
                            >
                                <FaLinkedin className="text-blue-600 text-2xl" />
                                <span className="text-gray-700 font-medium">LinkedIn</span>
                            </a>
                            <a
                                href="https://github.com/Abhinav1326"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-lg bg-white/20 border border-white/30 shadow hover:scale-105 transition"
                            >
                                <FaGithub className="text-gray-800 text-2xl" />
                                <span className="text-gray-700 font-medium">GitHub</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - 3D Illustration */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center items-center"
                >
                    {/* Placeholder - replace with 3D illustration */}
                    <img
                        src="/Contact-Us-animation.gif"
                        alt="3D Contact Illustration"
                        className="ml-20 w-100 h-auto drop-shadow-2xl"
                    />
                </motion.div>
            </div>
        </section>
    );
}
