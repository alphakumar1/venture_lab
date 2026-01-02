"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  imageSrc = "/globe.svg",
  link,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ rotateX: 3, rotateY: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative w-full max-w-sm rounded-xl border border-white/10 bg-black/60 p-4 shadow-neon hover:shadow-neon-strong text-center"
      style={{ perspective: 1000 }}
    >
      <div className="relative mx-auto h-36 w-36">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain drop-shadow-neon"
          sizes="144px"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-white/70">{description}</p>

      <div className="mt-4 flex items-center justify-center gap-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs text-white 
                     bg-gradient-to-r from-[#6d28d9] to-[#a855f7] shadow-neon 
                     hover:scale-[1.03] transition-transform"
        >
          Launch Project 🚀
        </a>
      </div>
    </motion.div>
  );
}
