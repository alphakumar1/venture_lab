"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

type Member = {
  name: string;
  role: string;
  linkedin: string;
  github: string;
};

/* ---------- Icons ---------- */

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.83v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-3.99v-6.5c0-1.55-.03-3.55-2.17-3.55-2.17 0-2.5 1.69-2.5 3.43V23H8V8.5z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.9.58.11.8-.25.8-.56v-2.06c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.27 3.41.97.11-.77.41-1.27.74-1.57-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.53.11-3.19 0 0 .98-.31 3.2 1.18.94-.26 1.94-.38 2.94-.38s2 .13 2.94.38c2.22-1.5 3.2-1.18 3.2-1.18.63 1.66.23 2.89.11 3.19.74.81 1.2 1.85 1.2 3.11 0 4.42-2.7 5.39-5.27 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.81.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

/* ---------- Component ---------- */

export default function MemberCard({
  name,
  role,
  linkedin,
  github,
}: Member) {
  // Motion values (desktop polish)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 160, damping: 24 };
  const rX = useSpring(rotateX, spring);
  const rY = useSpring(rotateY, spring);
  const sX = useSpring(x, spring);
  const sY = useSpring(y, spring);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;

    rotateY.set((dx / rect.width) * 10);
    rotateX.set(-(dy / rect.height) * 10);

    x.set((dx / rect.width) * 12);
    y.set((dy / rect.height) * 12);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rX, rotateY: rY, x: sX, y: sY }}
      whileHover={{ scale: 1.05 }}
      className="
        group relative w-80 h-52 rounded-2xl
        bg-black/70 backdrop-blur-xl
        border border-white/10
        shadow-[0_30px_90px_rgba(0,0,0,0.75)]
        transition-all
        hover:shadow-[0_50px_160px_rgba(168,85,247,0.35)]
        flex flex-col items-center justify-center text-center
      "
    >
      {/* Purple energy halo */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.25), transparent 65%)",
        }}
      />

      {/* Identity */}
      <h3 className="relative z-10 text-lg font-semibold text-white tracking-wide">
        {name}
      </h3>

      <p className="relative z-10 mt-1 text-sm text-white/60">
        {role}
      </p>

      {/* Divider */}
      <div className="relative z-10 mt-4 h-px w-12 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

      {/* Social actions */}
      <div className="relative z-10 mt-5 flex items-center gap-6 text-white/70">
        <Link
          href={linkedin}
          target="_blank"
          aria-label="LinkedIn"
          className="hover:text-purple-300 transition"
        >
          <LinkedInIcon className="h-5 w-5" />
        </Link>

        <Link
          href={github}
          target="_blank"
          aria-label="GitHub"
          className="hover:text-purple-300 transition"
        >
          <GitHubIcon className="h-5 w-5" />
        </Link>
      </div>
    </motion.div>
  );
}
