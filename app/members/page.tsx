"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import MemberCard from "../components/MemberCard";
import { members } from "./data";
import { useEffect, useRef, useState } from "react";

export default function MembersPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [stickyHeight, setStickyHeight] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);

  // Scroll progress for pinned section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // translateX of cards based on scroll (in pixels)
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Measure sticky viewport height and horizontal distance to avoid overshoot
  useEffect(() => {
    function measure() {
      const vh = window.innerHeight || 800;
      const stickyEl = stickyRef.current;
      const trackEl = trackRef.current;

      const stickyH = vh; // sticky h-screen under navbar handled by padding
      const containerW = stickyEl ? stickyEl.clientWidth : vh;
      const trackW = trackEl ? trackEl.scrollWidth : containerW;

      // Account for trailing padding to avoid blank space after last card
      let paddingRight = 0;
      if (trackEl) {
        const style = window.getComputedStyle(trackEl);
        paddingRight = parseFloat(style.paddingRight || "0");
      }

      const dist = Math.max(0, trackW - containerW - paddingRight);

      setStickyHeight(stickyH);
      setScrollDistance(dist);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navbar />

      {/* 🚩 FULLSCREEN PINNED MEMBERS SECTION */}
      <section
        ref={sectionRef}
        style={{ height: stickyHeight + scrollDistance || 1000 }}
        className="relative bg-black"
      >
        {/* Sticky container (takes up one screen while scrolling) */}
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen flex flex-col items-center justify-center pt-24 overflow-hidden overscroll-none"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-10 bg-gradient-to-r from-[#6d28d9] to-[#a855f7] bg-clip-text text-transparent"
          >
            Members
          </motion.h1>

          {/* 💫 HORIZONTAL TRACK */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-8 pl-[8vw] pr-[2vw] items-center h-[60vh] will-change-transform"
          >
            {members.map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
