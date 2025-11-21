"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Startup Match",
    description: "Match founders and ideas with shared goals.",
    imageSrc: "/globe.svg",
  },
  {
    title: "Market Radar",
    description: "Lightweight trends and competitor scanning tool.",
    imageSrc: "/globe.svg",
  },
  {
    title: "Pitch Helper",
    description: "Turn research into crisp slides and one-pagers.",
    imageSrc: "/globe.svg",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-semibold text-white"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-8 grid place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="#"
            className="neon-link inline-block text-white/80 hover:text-white"
          >
            View All Projects →
          </a>
        </motion.div>
      </div>
    </section>
  );
}