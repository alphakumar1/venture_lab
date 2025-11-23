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
  className="text-center font-bold tracking-tight text-white text-5xl sm:text-6xl md:text-7xl leading-none"
>
  <span className="inline-flex items-center justify-center gap-4">
    
    {/* V → Venture */}
    <span className="group peer relative inline-block min-w-[3.5ch] text-6xl sm:text-7xl md:text-8xl">
      {/* Default V (big) */}
      <span className="block transition-opacity duration-300 group-hover:opacity-0">
        V .
      </span>

      {/* On Hover → Venture */}
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   text-6xl sm:text-7xl md:text-8xl"
      >
        Venture
      </span>
    </span>

    {/* L → Lab */}
    <span className="group relative inline-block min-w-[3.5ch] text-6xl sm:text-7xl md:text-8xl transition-transform duration-300 will-change-transform peer-hover:translate-x-12">
      {/* Default L (gradient + big) */}
      <span
        className="block transition-opacity duration-300 group-hover:opacity-0
                   text-transparent bg-clip-text bg-gradient-to-r from-[#6d28d9] to-[#a855f7] drop-shadow-neon"
      >
        L .
      </span>

      {/* On Hover → Lab (gradient) */}
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   text-6xl sm:text-7xl md:text-8xl
                   text-transparent bg-clip-text bg-gradient-to-r from-[#6d28d9] to-[#a855f7] drop-shadow-neon"
      >
        Labs
      </span>
    </span>

  </span>
</motion.h1>


        {/* rest same as before */}
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
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="mt-3 flex items-center justify-center gap-6 text-center"
        >
          <span className="text-sm sm:text-base text-white/90 font-medium uppercase tracking-wider">
            innovate
          </span>
          <span className="text-sm sm:text-base text-white/50">.</span>

          <span className="text-sm sm:text-base text-white/90 font-medium uppercase tracking-wider">
            built
          </span>
          <span className="text-sm sm:text-base text-white/50">.</span>

          <span className="text-sm sm:text-base text-white/90 font-medium uppercase tracking-wider">
            launch
          </span>
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
