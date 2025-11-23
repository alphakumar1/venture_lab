"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

type Member = {
  name: string;
  role: string;
  linkedin: string;
  github: string;
};

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.83v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-3.99v-6.5c0-1.55-.03-3.55-2.17-3.55-2.17 0-2.5 1.69-2.5 3.43V23H8V8.5z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.9.58.11.8-.25.8-.56v-2.06c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.27 3.41.97.11-.77.41-1.27.74-1.57-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.53.11-3.19 0 0 .98-.31 3.2 1.18.94-.26 1.94-.38 2.94-.38s2 .13 2.94.38c2.22-1.5 3.2-1.18 3.2-1.18.63 1.66.23 2.89.11 3.19.74.81 1.2 1.85 1.2 3.11 0 4.42-2.7 5.39-5.27 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.81.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function MemberCard({ name, role, linkedin, github }: Member) {
  // 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  // Magnetic attraction
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 20 });
  const springY = useSpring(my, { stiffness: 200, damping: 20 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const tiltAmt = 8; // tilt sensitivity
    const magnetAmt = 10; // max pixels to move towards cursor

    rotateY.set(((x - midX) / midX) * tiltAmt);
    rotateX.set(-((y - midY) / midY) * tiltAmt);

    mx.set(((x - midX) / midX) * magnetAmt);
    my.set(((y - midY) / midY) * magnetAmt);
  }
  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="snap-center group perspective-1000 w-80 h-44 rounded-xl border border-white/10 bg-gradient-to-br from-[#6d28d9] to-[#a855f7] p-5 shadow-neon hover:shadow-neon-strong flex flex-col items-center justify-center text-center"
    >
      <h3 className="text-lg font-semibold text-white drop-shadow-neon">{name}</h3>
      <p className="mt-1 text-sm text-white/80">{role}</p>
      <div className="mt-4 flex items-center justify-center gap-4 text-white/90">
        <Link href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon className="h-5 w-5 hover:text-white transition" />
        </Link>
        <Link href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon className="h-5 w-5 hover:text-white transition" />
        </Link>
      </div>
    </motion.div>
  );
}