"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Members", href: "#members" },
  { label: "About", href: "#About" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-sm bg-black/70"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#home" className="font-semibold tracking-tight text-white">
          <span className="text-lg sm:text-xl drop-shadow-neon">Venture Lab</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ y: -2, filter: "brightness(1.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Link
                href={item.href}
                className="neon-link text-sm text-white/80 hover:text-white"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden group relative rounded p-2 border border-white/10 hover:border-white/20 transition"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-[2px] bg-white transition-transform group-hover:bg-purple-300" />
          <span className="block w-6 h-[2px] bg-white mt-1 transition-transform group-hover:bg-purple-300" />
          <span className="block w-6 h-[2px] bg-white mt-1 transition-transform group-hover:bg-purple-300" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden border-t border-white/5"
      >
        <div className="mx-auto max-w-6xl px-6 pb-4 pt-2 grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="neon-link py-2 text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}