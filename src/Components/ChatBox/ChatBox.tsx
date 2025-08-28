"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Sparkles } from "lucide-react";

type ChatBoxProps = {
  visible: boolean;
  onClose: () => void;
};

type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  text: string;
  ts: number;
};

const SUGGESTIONS = [
  "Show projects",
  "Download resume",
  "Your skills",
  "Contact info",
  "Social links",
] as const;

export default function ChatBox({ visible, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Known links/details from this portfolio
  const links = useMemo(
    () => ({
      projectsId: "projects",
      skillsId: "skills",
      aboutId: "about",
      contactId: "contact",
      resume: "/Abhi Resume.pdf",
      email: "abhinavrbgore13@gmail.com",
      phone: "+91 8530684793",
      linkedin: "https://www.linkedin.com/in/abhinavgore13/",
      github: "https://github.com/Abhinav1326",
      smartMailsLive: "https://smart-mail-beige.vercel.app/",
      smartMailsRepo: "https://github.com/Abhinav1326/BE-Final-Year-Project",
    }),
    []
  );

  // No persistence: chat starts blank on each reload

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, visible]);

  const addMessage = (sender: ChatMessage["sender"], text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender, text, ts: Date.now() },
    ]);
  };

  // Very small markdown transformer for links only: [text](url)
  const renderTextWithLinks = (text: string) => {
    // Escape basic HTML to avoid injection
    const escapeHtml = (s: string) =>
      s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

    const linkified = escapeHtml(text).replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_m, label: string, url: string) => {
        const safeUrl = url.replace(/"/g, "&quot;");
        const safeLabel = label.replace(/"/g, "&quot;");
        const isHash = safeUrl.startsWith("#");
        // If it's a hash link, just anchor to the id; else open new tab
        return isHash
          ? `<a href="${safeUrl}" class="text-indigo-600 hover:underline">${safeLabel}</a>`
          : `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline">${safeLabel}</a>`;
      }
    );

    // Convert new lines to <br>
    return linkified.replaceAll("\n", "<br/>");
  };

  const scrollToSection = (id: string) => {
    try {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Optionally focus the page
    } catch {
      // ignore
    }
  };

  const openUrl = (url: string) => {
    try {
      if (url.startsWith("mailto:") || url.startsWith("tel:")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch {
      // ignore
    }
  };

  const handleSuggestion = (s: (typeof SUGGESTIONS)[number]) => {
    const mapping: Record<(typeof SUGGESTIONS)[number], string> = {
      "Show projects": "Show me your projects",
      "Download resume": "Download resume",
      "Your skills": "What are your skills?",
      "Contact info": "How can I contact you?",
      "Social links": "Share your LinkedIn and GitHub",
    };
    onSend(mapping[s]);
  };

  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const getBotReply = (raw: string): string => {
    const text = raw.toLowerCase().trim();
    // Greetings (general)
  if (/\b(hi|hii|hiii|hello|hey|heyy|hiya|yo)\b/.test(text)) {
      return pick([
    "Hi there! I’m Ava, Abhinav’s assistant. Want to peek at his [Projects](#projects) or grab his [Resume](/Abhi Resume.pdf)?",
    "Hello! I’m Ava—here for anything about Abhinav: [Projects](#projects), [Skills](#skills), [Contact](#contact).",
    "Hey! I’m Ava. I can open [Projects](#projects), share [Skills](#skills), or fetch his [Resume](/Abhi Resume.pdf).",
      ]);
    }
    // Time-based greetings
    if (/good\s+(morning|afternoon|evening|night)\b/.test(text)) {
      const part = text.match(/good\s+(morning|afternoon|evening|night)/)?.[1] || "day";
      const map: Record<string, string[]> = {
        morning: [
          "Good morning! Ready to check Abhinav’s [Projects](#projects)?",
          "Morning! Coffee and code—want his [Resume](/Abhi Resume.pdf)?",
        ],
        afternoon: [
          "Good afternoon! Need Abhinav’s [Skills](#skills) or [Contact](#contact)?",
          "Afternoon! I can open his [Projects](#projects) if you’d like.",
        ],
        evening: [
          "Good evening! Fancy a tour of Abhinav’s [Projects](#projects)?",
          "Evening! I can send over his [Resume](/Abhi Resume.pdf).",
        ],
        night: [
          "Good night! Before you go, want Abhinav’s [Resume](/Abhi Resume.pdf)?",
          "Night owl, huh? Here are his [Projects](#projects).",
        ],
        day: ["Hello!"],
      };
      return pick(map[part] || map.day);
    }
    // Who are you
    if (/\b(who\s+are\s+you|your\s+name|introduce|what\s+are\s+you|who\s+are\s*u|who\s*r\s*u)\b/.test(text)) {
      return pick([
        "I’m Ava—Abhinav’s assistant and your guide to his work, skills, and contact details.",
        "I’m Ava, the friendly assistant for Abhinav’s portfolio. Ask me for projects, resume, or socials!",
      ]);
    }
    // About Abhinav (specific)
    if (/\b(tell\s*me\s*about\s*abhinav|about\s*abhinav|who\s*is\s*abhinav)\b/.test(text)) {
      return pick([
        "Abhinav is a full‑stack developer (React/Next.js, Node.js, Python) who loves building clean, performant apps. Learn more [About Abhinav](#about).",
        "He’s a BE(IT) grad (2021–2025) with projects like Smart Mails and a keen eye for UX/performance. See the [About](#about) section.",
      ]);
    }
    // How are you
    if (/(how\s+are\s+you|how’s\s+it\s+going|hows\s+it\s+going|what’s\s+up|whats\s+up)/.test(text)) {
      return pick([
        "I’m great—ready to help! Want [Projects](#projects) or [Resume](/Abhi Resume.pdf)?",
        "Doing well! Can I open [Skills](#skills) for you?",
      ]);
    }
    // Thanks
    if (/(thanks|thank\s*you|ty|appreciate)/.test(text)) {
      return pick([
        "Anytime! Need anything else about Abhinav?",
        "You’re welcome! Want to see his [Projects](#projects)?",
      ]);
    }
    // Joke (lightweight)
    if (/(joke|something\s+funny)/.test(text)) {
      return pick([
        "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
        "I told the server a joke—now it’s in a great response. 😉",
      ]);
    }
    // Projects
    if (text.includes("project")) {
      return `Here are Abhinav’s [Projects](#projects). Try Smart Mails: [Live](${links.smartMailsLive}) • [Repo](${links.smartMailsRepo}).`;
    }
    if (text.includes("open project")) {
      setTimeout(() => scrollToSection(links.projectsId), 0);
  return "Jumping to [Projects](#projects) section… 👇";
    }
    // Resume
    if (text.includes("resume") || text.includes("cv")) {
      return `You can download Abhinav’s resume here: [Resume](${links.resume}).`;
    }
    if (text.includes("download resume") || text.includes("open resume")) {
      setTimeout(() => openUrl(links.resume), 0);
      return "Opening resume in a new tab… 📄";
    }
    // Skills
    if (text.includes("skill")) {
      return "Abhinav’s skills include React, Next.js, Tailwind, Node.js, Python, Firebase, MongoDB, and more. See [Skills](#skills).";
    }
    if (text.includes("open skills")) {
      setTimeout(() => scrollToSection(links.skillsId), 0);
  return "Scrolling to [Skills](#skills)… 👇";
    }
    // Contact
    if (text.includes("contact") || text.includes("email") || text.includes("phone")) {
      const tel = "+918530684793";
      return `Reach Abhinav at Email: [${links.email}](mailto:${links.email})\nPhone: [${links.phone}](tel:${tel}). Or visit the [Contact](#contact) section.`;
    }
    if (text.includes("open contact")) {
      setTimeout(() => scrollToSection(links.contactId), 0);
  return "Heading to [Contact](#contact) section… 👇";
    }
    // Open socials directly
    if (/open\s+linkedin/.test(text)) {
      setTimeout(() => openUrl(links.linkedin), 0);
      return "Opening Abhinav’s LinkedIn…";
    }
    if (/open\s+github/.test(text)) {
      setTimeout(() => openUrl(links.github), 0);
      return "Opening Abhinav’s GitHub…";
    }
    // Socials
    if (text.includes("linkedin") || text.includes("github") || text.includes("social")) {
      return `Abhinav’s profiles: [LinkedIn](${links.linkedin})\n[GitHub](${links.github})`;
    }
    // Smart Mails live
    if (text.includes("smart mails") && text.includes("live")) {
      return `Here’s the live demo of Abhinav’s Smart Mails: [Smart Mails Live](${links.smartMailsLive})`;
    }
    if (text.includes("smart mails") && (text.includes("code") || text.includes("repo"))) {
      return `Repository for Abhinav’s Smart Mails: [Smart Mails Repo](${links.smartMailsRepo})`;
    }
    // About
    if (text.includes("about")) {
      return "Abhinav is a full‑stack developer who enjoys building clean, performant apps. Learn more [About Abhinav](#about).";
    }
    if (text.includes("open about")) {
      setTimeout(() => scrollToSection(links.aboutId), 0);
  return "Taking you to the [About](#about) section…";
    }
    // Help
    if (text.includes("help") || text.includes("what can you do")) {
      return "I’m Abhinav’s assistant. I can show his [Projects](#projects), open his [Resume](/Abhi Resume.pdf), share his [Skills](#skills), and provide [Contact](#contact) or social links.";
    }
    // Location
    if (/(where.*(from|located|based)|location)/.test(text)) {
      return "Abhinav is based in Ahmednagar, Maharashtra, India. You can reach him via [Contact](#contact).";
    }
    // Education
    if (/(education|study|college|degree)/.test(text)) {
      return "B.E. in Information Technology (2021–2025), Sinhgad Institute of Technology, CGPA 8.52. More in [About](#about).";
    }
    // Certifications
    if (/(certification|certifications|courses)/.test(text)) {
      return "Certifications: Google IT Automation with Python, AWS Cloud Practitioner Essentials, Intro to Git & GitHub, Crash Course on Python. See [About](#about).";
    }
    // Tech stack
    if (/(tech\s*stack|stack|technologies|tools)/.test(text)) {
      return "Primary stack: React, Next.js, Tailwind CSS, Node.js, Python, Firebase, MongoDB, MySQL, Git/GitHub, AWS. See [Skills](#skills).";
    }
    // Time/date
    if (/(what\s*time|current\s*time|time\s*now)/.test(text)) {
      const d = new Date();
      return `It’s ${d.toLocaleTimeString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone}).`;
    }
    if (/(today’s\s*date|date\s*today|what\s*date)/.test(text)) {
      const d = new Date();
      return `Today is ${d.toLocaleDateString()}.`;
    }
    // Clear chat
    if (/^(clear|reset)\s*(chat|conversation)?$/.test(text)) {
      setTimeout(() => setMessages([]), 0);
      return "Cleared. How can I help next?";
    }
    // Copy last bot message
    if (/(copy\s*that|copy\s*message|copy\s*last)/.test(text)) {
      const lastBot = [...messages].reverse().find((m) => m.sender === "bot");
      if (lastBot && navigator.clipboard) {
        navigator.clipboard.writeText(lastBot.text).catch(() => {});
        return "Copied the last message to your clipboard.";
      }
      return "There’s nothing to copy yet.";
    }
    // Compose email draft
    if (/(compose|write)\s*(an\s*)?email/.test(text)) {
      const subject = encodeURIComponent("Regarding an opportunity");
      const body = encodeURIComponent(
        "Hello Abhinav,\n\nI came across your portfolio and would love to connect regarding...\n\nBest regards,\n"
      );
      setTimeout(() => openUrl(`mailto:${links.email}?subject=${subject}&body=${body}`), 0);
      return "Opening your email client with a prefilled draft…";
    }
    // Home / top
    if (/(go\s*home|back\s*to\s*top|open\s*home)/.test(text)) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
      return "Taking you to the top…";
    }
    // Farewell
    if (/(bye|goodbye|see\s*ya|later)/.test(text)) {
      return pick([
        "Bye! Ping me anytime if you need Abhinav’s details.",
        "See you later! I’ll be here if you need anything about Abhinav.",
      ]);
    }
    // Resume open by wording
    if (/open\s+resume/.test(text)) {
      setTimeout(() => openUrl(links.resume), 0);
      return "Opening Abhinav’s resume… 📄";
    }
    // Email/phone open
    if (/open\s+email/.test(text)) {
      setTimeout(() => openUrl(`mailto:${links.email}`), 0);
      return "Opening your email client…";
    }
    if (/(call|dial|phone\s*now)/.test(text)) {
      setTimeout(() => openUrl(`tel:+918530684793`), 0);
      return "Opening your dialer…";
    }
    // Hiring/Collaboration
    if (/(hire|work\s*with|collaborate|freelance|available)/.test(text)) {
      return "Abhinav is open to opportunities and collaborations. Reach out via [Contact](#contact) or email [abhinavrbgore13@gmail.com](mailto:abhinavrbgore13@gmail.com).";
    }
    // Smart Mails details
    if (/smart\s*mails.*(what|about|feature|features)/.test(text)) {
      return "Smart Mails is an AI‑assisted tool that auto‑extracts recruiter emails and sends customized job applications. See it [Live](${links.smartMailsLive}) or the [Repo](${links.smartMailsRepo}).";
    }
    return "I didn't catch that. Try asking about Abhinav’s projects, skills, resume, or contact info.";
  };

  const onSend = (value?: string) => {
    const toSend = (value ?? input).trim();
    if (!toSend) return;
    addMessage("user", toSend);
    setInput("");
    setIsTyping(true);
    // Simulate thinking
    setTimeout(() => {
      const reply = getBotReply(toSend);
      addMessage("bot", reply);
      setIsTyping(false);
    }, Math.min(1200, 400 + toSend.length * 15));
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6
                     w-[300px] max-w-[92vw] sm:w-[360px]
                     h-[50vh] sm:h-[56vh] max-h-[560px]
                     rounded-2xl shadow-2xl border border-white/60 flex flex-col z-[10000]
                     bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/60 bg-white/60 backdrop-blur-md relative rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-600">
                <Sparkles size={16} />
              </div>
              <div className="leading-tight">
                <span className="font-semibold text-gray-800 text-sm sm:text-base block">Ava</span>
                <span className="text-[11px] text-gray-500 hidden sm:block">Abhinav’s assistant • ask about projects, skills, resume</span>
              </div>
            </div>

            {/* Small image / avatar on border (position unchanged) */}
            <div className="hidden sm:block absolute -top-28 -right-0 w-30 h-30 overflow-hidden">
              <img
                src="/cat_chat.gif"
                alt="chat avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-colors text-sm rounded-full px-2"
              aria-label="Close chat"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div
            ref={scrollRef}
            className="flex-1 p-2.5 sm:p-3 overflow-y-auto text-gray-700 space-y-2 text-[13px] sm:text-[13.5px] leading-relaxed"
            aria-live="polite"
          >
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  m.sender === "user"
                    ? "ml-auto max-w-[85%]"
                    : "mr-auto max-w-[90%]"
                }
              >
                <div
                  className={
                    m.sender === "user"
                      ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white px-3 py-2.5 rounded-2xl rounded-br-sm shadow"
                      : "bg-white/80 border border-white/60 text-gray-800 px-3 py-2.5 rounded-2xl rounded-bl-sm shadow"
                  }
                  dangerouslySetInnerHTML={{ __html: renderTextWithLinks(m.text) }}
                />
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="mr-auto max-w-[70%]"
                >
                  <div className="inline-flex items-center gap-2 bg-white/80 border border-white/60 text-gray-600 px-3 py-2 rounded-2xl rounded-bl-sm shadow">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400/80 rounded-full animate-bounce [animation-delay:0ms]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400/80 rounded-full animate-bounce [animation-delay:100ms]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400/80 rounded-full animate-bounce [animation-delay:200ms]"></span>
                    </span>
                    <span className="text-xs">typing…</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggestions */}
          <div className="px-2.5 sm:px-3 pb-1 flex gap-2 overflow-x-auto scrollbar-none">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full bg-white/70 border border-white/60 text-gray-700 hover:bg-white transition"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input box */}
          <div className="p-2.5 sm:p-3 border-t border-white/60 flex items-center gap-2 bg-white/70 rounded-b-2xl pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center gap-2 flex-1 rounded-xl border border-white/60 bg-white/70 px-2.5">
              <MessageCircle size={16} className="text-gray-400" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a message… (Press Enter)"
                className="flex-1 px-1 py-2 text-sm bg-transparent focus:outline-none"
                aria-label="Message"
              />
            </div>
            <button
              onClick={() => onSend()}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-purple-600 text-white px-3 py-2 rounded-lg transition-colors shadow"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
