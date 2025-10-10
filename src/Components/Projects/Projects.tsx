"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function Projects() {
  type Project = {
    title: string;
    link: string; // repository or code link
    description: string;
    tech: string[];
    live?: string; // optional live demo URL
    details: {
      overview: string;
      architecture: string[];
      workflow: string[];
      highlights?: string[];
      diagram?: {
        src: string;
        alt: string;
        caption?: string;
      };
    };
  };

  const projects: Project[] = [
    {
      title: "Smart Mails",
      link: "https://github.com/Abhinav1326/BE-Final-Year-Project",
      description:
        "Tool that analyzes job descriptions and automatically emails recruiters with relevant candidate details.",
      tech:  ["Next.js", "Tailwind CSS", "Firebase", "Nodemailer", "API", "Gemini AI"],
      live: "https://smart-mail-beige.vercel.app/",
      details: {
        overview:
          "Analyzes job descriptions with Gemini API, structures recruiter insights, and fires personalized emails so candidates reach hiring teams faster.",
        architecture: [
          "Next.js + Tailwind dashboard captures job postings and manages outreach campaigns.",
          "Gemini API microservice parses descriptions, extracts recruiters, and surfaces candidate fit signals.",
          "Firebase stores recruiter contacts, structured job data, and message templates for reuse.",
          "Nodemailer workflow service automates email delivery, retries, and follow-ups.",
        ],
        workflow: [
          "User submits a job description → Gemini API returns structured recruiter intel.",
          "System selects the best template and fills candidate highlights automatically.",
          "Candidate reviews and confirms → Nodemailer sends emails with queued throttling.",
          "Firebase logs delivery state so the dashboard shows real-time communication status.",
        ],
        highlights: [
          "Reduced manual outreach effort by ~70% for early users.",
          "Pluggable scraping adapters to support new job portals with minimal changes.",
        ],
        // diagram: {
        //   src: "/file.svg",
        //   alt: "High-level architecture for Smart Mails showing data flow from scraping to outreach",
        //   caption: "Scraping → AI Prioritizer → Email Orchestrator → Recruiter Inbox",
        // },
      },
    },
    
    {
      title: "Watch Together",
      link: "https://github.com/Abhinav1326/WatchTogether",
      description:
        "Developed Watch Together, it is a real-time web app that lets users watch YouTube together, share screens and chat all in sync.",
      tech:  ["Next.js", "React", "Tailwind CSS", "Firebase", "Node.js", "Express", "WebRTC", "Socket.io", "YouTube API"],
      live: "https://watch-together-hc8i.vercel.app/",
      details: {
        overview:
          "Watch Together synchronizes playback, chat, and reactions so remote teams or friends can share a YouTube session seamlessly.",
        architecture: [
          "Next.js SSR for lobby creation and SEO-friendly shareable rooms.",
          "Node.js + Socket.io signaling server manages presence, playback state, and chat events.",
          "WebRTC mesh handles low-latency video/audio screen sharing between participants.",
          "YouTube IFrame API controls media playback across all clients.",
        ],
        workflow: [
          "Host creates a room → invite link shared with participants.",
          "Participants join, negotiate WebRTC connections via Socket.io signaling.",
          "Playback controls broadcast from host and mirrored on all clients in <200ms.",
          "Chat and emoji reactions overlay the stream, stored transiently in Firebase for resilience.",
        ],
        highlights: [
          "Adaptive sync algorithm corrects drift using periodic checkpoints.",
          "Supports screen share fallback when YouTube link is unavailable.",
        ],
      },
    },
    {
      title: "REAL-TIME JOB SEEKER AUTOMATION",
      link: "https://github.com/Abhinav1326/BE-Final-Year-Project",
      description:
        "Web app that automates job applications across portals like Internshala and Naukri.",
      tech: ["React", "Node.js", "ExpressJS", "Puppeteer", "JavaScript", "Web Automation"],
      live: "https://be-final-year-project-sooty.vercel.app/",
      details: {
        overview:
          "Automates multi-portal job submissions with Puppeteer-driven form filling, tracking progress from a React dashboard.",
        architecture: [
          "React frontend lets candidates review suggested roles and monitor application status.",
          "ExpressJS backend coordinates portal logins, captcha handling, and submission flows.",
          "Puppeteer automation scripts handle form filling, resume uploads, and confirmation capture.",
          "MongoDB layer logs job history, outcomes, and retry states for auditing.",
        ],
        workflow: [
          "Scheduler checks portals like Internshala/Naukri → new roles pushed into a shared queue.",
          "Candidate filters preferences and selects opportunities from the dashboard.",
          "Puppeteer scripts auto-fill forms, attach resumes, and submit applications.",
          "System captures confirmation IDs and updates status so users can track completions.",
        ],
        highlights: [
          "Reduced job application time by 70% while sending 100+ submissions automatically.",
          "End-to-end automation across major job portals with resume upload support.",
        ],
      },
    },
    {
      title: "AI BASED PERSONAL VOICE ASSISTANT (VERONICA)",
      link: "https://github.com/Abhinav1326/Veronica-Personal-Voice-Assistant-",
      description:
        "AI assistant capable of assignment writing, personalized advice, and web search.",
      tech: ["Python", "API", "Artificial Intelligence", "ML", "OpenCV", "Selenium"],
      details: {
        overview:
          "Desktop voice assistant that combines NLP, automation, and computer vision so students offload repetitive academic tasks.",
        architecture: [
          "Wake-word listener feeds speech-to-text models for intent detection.",
          "NLP engine maps user commands to skills such as writing, research, or reminders.",
          "OpenCV context module evaluates user presence and provides visual cues.",
          "Selenium automation layer performs web searches and multi-step browser tasks.",
        ],
        workflow: [
          "User issues voice command → speech recognition captures and transcribes input.",
          "Intent handler routes request to the appropriate automation skill.",
          "Skill executes (e.g., write assignment draft, run web search) leveraging Python libraries.",
          "Assistant responds with synthesized speech and logs results for quick follow-up.",
        ],
        highlights: [
          "Saves students 4–5 hours weekly by automating routine academic tasks.",
          "Real-time interaction loop keeps conversations responsive and contextual.",
        ],
      },
    },
    {
      title: "Mobile Chat Application",
      link: "https://github.com/Abhinav1326/Mobile-Chat-Application",
      description:
        "Chat app with React Native, Expo, Firebase, and Firestore for real-time messaging and responsive UI.",
      tech: ["React Native", "Expo", "Firebase", "Firestore"],
      details: {
        overview:
          "Cross-platform mobile chat app with theming, read receipts, and offline-first messaging backed by Firebase.",
        architecture: [
          "Expo-managed React Native client with modular feature slices (auth, chat, profile).",
          "Firebase Auth handles secure sign-in via email/OTP providers.",
          "Firestore real-time listeners sync conversations, typing indicators, and presence.",
          "Cloud Functions run message moderation and badge count fan-out jobs.",
        ],
        workflow: [
          "User signs in → contacts loaded from Firestore with lazy pagination.",
          "Messages buffered locally; offline queue flushes once connectivity returns.",
          "Push notifications triggered via Expo when new messages arrive.",
          "Settings let users switch themes, mute chats, and manage media storage.",
        ],
        highlights: [
          "Optimistic UI keeps chat fluid under spotty networks.",
          "Implements double-tick read receipts similar to WhatsApp.",
        ],

      },
    },
  ];

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const closeModal = () => setActiveProject(null);

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject]);

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
              <div className="flex items-center justify-between mt-4">
                {/* Visit (live) button - only if project.live exists */}
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-medium shadow hover:scale-105 transition"
                  >
                    View Live
                  </a>
                ) : (
                  <span />
                )}

                {/* Code links */}
                <div className="flex align-center justify-center gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 flex items-center justify-center hover:text-blue-600"
                    aria-label={`View ${project.title} code`}
                  >
                    <FaGithub size={22} />
                  </a>
                  <button
                    onClick={() => setActiveProject(project)}
                    className="px-4 py-1.5 rounded-xl bg-white/80 border border-white/60 font-small shadow-[4px_4px_12px_rgba(163,177,198,0.45)] text-gray-500 hover:bg-white hover:shadow-[6px_6px_16px_rgba(163,177,198,0.5)] hover:scale-103 transition"
                  >
                    More Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[11000] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              className="relative w-[96%] sm:w-[88%] md:w-[80%] max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl border border-white/70 shadow-[12px_12px_32px_rgba(163,177,198,0.45)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[92vh] no-scrollbar">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">
                      {activeProject.title}
                    </h3>
                    <p className="text-gray-600 max-w-2xl">{activeProject.details.overview}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="self-end sm:self-start px-3 py-1.5 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    aria-label="Close project details"
                  >
                    Close
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/70 border border-white/60 rounded-2xl p-5 shadow-[4px_4px_14px_rgba(163,177,198,0.35)]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Architecture</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      {activeProject.details.architecture.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/70 border border-white/60 rounded-2xl p-5 shadow-[4px_4px_14px_rgba(163,177,198,0.35)]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Workflow</h4>
                    <ol className="space-y-2 text-gray-600 text-sm list-decimal list-inside">
                      {activeProject.details.workflow.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {activeProject.details.highlights && (
                  <div className="mt-6 bg-gradient-to-br from-blue-50/80 to-purple-50/80 border border-white/60 rounded-2xl p-5 shadow-[4px_4px_14px_rgba(163,177,198,0.25)]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      {activeProject.details.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeProject.details.diagram?.src && (
                  <div className="mt-6 bg-white/75 border border-white/60 rounded-2xl p-5 shadow-[4px_4px_18px_rgba(163,177,198,0.3)]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Architectural Diagram</h4>
                    <div className="relative w-full max-h-[280px] overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-slate-50/80 to-slate-100/60 flex items-center justify-center">
                      <Image
                        src={activeProject.details.diagram.src}
                        alt={activeProject.details.diagram.alt}
                        width={960}
                        height={540}
                        className="w-full h-full object-contain p-3"
                        priority={false}
                      />
                    </div>
                    {activeProject.details.diagram.caption && (
                      <p className="mt-3 text-xs text-gray-500 text-center">{activeProject.details.diagram.caption}</p>
                    )}
                  </div>
                )}

                <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div className="flex flex-col gap-3 md:flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">Tech Stack &amp; Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs sm:text-sm rounded-full bg-[#e0e5ec] border border-[#f1f3f6] shadow-[4px_4px_8px_#a3b1c6,_-4px_-4px_8px_#ffffff] text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:items-end">
                    <h4 className="text-lg font-semibold text-gray-800">Quick Actions</h4>
                    <div className="flex flex-wrap gap-3 md:justify-end">
                      {activeProject.live && (
                        <a
                          href={activeProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium shadow hover:scale-105 transition"
                        >
                          View Live
                        </a>
                      )}
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium shadow hover:scale-105 transition"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
