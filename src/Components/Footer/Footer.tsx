import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-br from-[#e0e5ec] to-[#f1f3f6] text-gray-800 py-8 overflow-hidden">
      {/* Glassmorphic Floating Shapes */}
      <div className="absolute w-56 h-56 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-[inset_5px_5px_15px_rgba(0,0,0,0.1),inset_-5px_-5px_15px_rgba(255,255,255,0.7)] top-[-60px] left-[-60px]" />
      <div className="absolute w-40 h-40 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 shadow-[inset_5px_5px_15px_rgba(0,0,0,0.1),inset_-5px_-5px_15px_rgba(255,255,255,0.7)] bottom-[-40px] right-[-40px]" />

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center  relative z-10">
        {/* Brand / Name */}
        <h2 className="text-2xl font-semibold tracking-wide drop-shadow-md">
          Abhinav Gore
        </h2>

        {/* Social Links */}
        <div className="flex gap-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#e0e5ec] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] transition-all duration-300"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#e0e5ec] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] transition-all duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="p-3 rounded-xl bg-[#e0e5ec] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] transition-all duration-300"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" text-center text-sm text-gray-600 relative z-10">
        © {new Date().getFullYear()} Abhinav Gore — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
