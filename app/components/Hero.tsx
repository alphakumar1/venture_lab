"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative isolate w-full">
      <div className="absolute inset-0 -z-10 glow-bg" />

      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white text-center"
        >
          Venture <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6d28d9] to-[#a855f7] drop-shadow-neon">Lab</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-white/70 text-center"
        >
          Where student ideas become real startups.
        </motion.p>
        <motion.div
       initial={{ opacity: 0, y: 10 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
       className="mt-3 flex items-center justify-center gap-4 text-sm sm:text-base font-semibold tracking-widest text-white/80"
>
  <span>Innovate</span>
  <span className="text-white/40">•</span>
  <span>Build</span>
  <span className="text-white/40">•</span>
  <span>Launch</span>
</motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#projects"
            className="group inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#6d28d9] to-[#a855f7] shadow-neon transition-transform hover:scale-[1.03]"
          >
            Explore Projects
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-white border border-white/10 hover:border-white/20 hover:shadow-neon/50 transition"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
