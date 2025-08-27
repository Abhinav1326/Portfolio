import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Hero from "@/Components/Hero/Hero";
import About from "@/Components/About/About";
import Projects from "@/Components/Projects/Projects";
import Skills from "@/Components/Skills/Skills";
import Footer from "@/Components/Footer/Footer";
import Contact from "@/Components/Contact/Contact";
import AnimeBuddyOverlay from "@/Components/AnimeBuddyOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhinav Gore",
  description: "Created by Abhinav Gore, a full-stack developer specializing in React, Next.js, and Python.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimeBuddyOverlay imageSrc="/cat.gif" size={140} />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
        {children}
      </body>
    </html>
  );
}
