"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const outerSkills = [
  { id: "react", name: "React", icon: "/icons/react.svg" },
  { id: "ts", name: "TypeScript", icon: "/icons/typescript.svg" },
  { id: "next", name: "Next.js", icon: "/icons/nextjs.svg" },
  { id: "node", name: "Node.js", icon: "/icons/nodejs.svg" },
];

const innerSkills = [
  { id: "py", name: "Python", icon: "/icons/python.svg" },
  { id: "mongo", name: "MongoDB", icon: "/icons/mongodb.svg" },
  { id: "git", name: "Git", icon: "/icons/git.svg" },
  { id: "tw", name: "Tailwind", icon: "/icons/tailwind.svg" },
];

type Skill = { id: string; name: string; icon: string };

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 800, h: 450 });
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const isDesktopOrbit = useMediaQuery("(min-width: 768px)");

  // track container size so orbits always fit nicely
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    };

    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMouse(null);
  };

  const renderRing = (
    items: Skill[],
    orbitRadius: number,
    interactionRadiusFactor: number,
    floatOffset: number,
    boxSize: number
  ) => {
    const centerX = size.w / 2 - 37;
    const centerY = size.h / 2 -20;

    const interactionRadius = orbitRadius * interactionRadiusFactor; // how far "attraction" works
    const maxOffset = 14; // max pixels icon moves toward mouse (subtle now)

    return items.map((skill, index) => {
      const angle = (2 * Math.PI * index) / items.length - Math.PI / 2; // start at top

      const baseX = centerX + orbitRadius * Math.cos(angle);
      const baseY = centerY + orbitRadius * Math.sin(angle);

      let offsetX = 0;
      let offsetY = 0;

      if (mouse) {
        const dx = mouse.x - baseX;
        const dy = mouse.y - baseY;
        const dist = Math.hypot(dx, dy);

        if (dist > 0 && dist < interactionRadius) {
          // softer, slower falloff
          const rawK = (interactionRadius - dist) / interactionRadius; // 0..1
          const k = Math.pow(rawK, 1.7); // ease it so it’s gentle
          const strength = maxOffset * k;
          offsetX = (dx / dist) * strength;
          offsetY = (dy / dist) * strength;
        }
      }

      const left = baseX + offsetX;
      const top = baseY + offsetY;

      return (
        <motion.div
          key={skill.id}
          className="absolute"
          style={{
            left,
            top,
            transform: "translate(-50%, -50%)",
            pointerEvents: "auto",
            zIndex: 20,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.06 * index, ease: "easeOut" }}
        >
          <MagneticSkillIcon
            skill={skill}
            index={index}
            floatingOffset={floatOffset}
            boxSize={boxSize}
          />
        </motion.div>
      );
    });
  };

  // choose orbit sizes based on container (so it never overflows)
  const minDim = Math.min(size.w, size.h);
  const orbitBoxSize = Math.max(52, Math.min(68, Math.round(minDim * 0.12)));
  // keep enough padding so icons never clip outside container
  const outerRadius = Math.max(0, minDim / 2 - orbitBoxSize / 2 - 0);
  const innerRadius = outerRadius * 0.62;

  return (
    <section
      id="skills"
      className="w-full md:min-h-screen flex items-center justify-center py-12 md:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Mobile: simple, readable layout */}
        <div className="md:hidden">
          <div className="relative mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-black/30 px-5 py-8 backdrop-blur">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[-10%] opacity-80"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(109,40,217,0.35), transparent 65%)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/45">
                Venture Lab
              </span>
              <span className="mt-1 text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e5deff] to-white">
                Skills
              </span>
            </div>

            <div className="relative z-10 mt-7 flex flex-wrap justify-center gap-x-6 gap-y-7">
              {[...outerSkills, ...innerSkills].map((skill, index) => (
                <MagneticSkillIcon
                  key={skill.id}
                  skill={skill}
                  index={index}
                  floatingOffset={0}
                  boxSize={56}
                  disableFloat
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop/tablet: orbit layout */}
        <div
          ref={containerRef}
          className="relative mx-auto hidden w-full max-w-4xl aspect-square md:block"
          onMouseMove={isDesktopOrbit ? handleMouseMove : undefined}
          onMouseLeave={isDesktopOrbit ? handleMouseLeave : undefined}
        >
          {/* soft bg glow behind the whole system */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-10%] opacity-80"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(109,40,217,0.35), transparent 65%)",
            }}
          />

          {/* orbit outlines */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
            style={{
              width: outerRadius * 2,
              height: outerRadius * 2,
              boxShadow: "0 32px 80px rgba(15,23,42,0.9)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6d28d9]/40 border-dashed"
            style={{
              width: innerRadius * 2,
              height: innerRadius * 2,
              boxShadow: "0 0 40px rgba(109,40,217,0.45)",
            }}
          />

          {/* central sphere */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              width: minDim * 0.26,
              height: minDim * 0.26,
              background:
                "conic-gradient(from 160deg, #6d28d9, #a855f7, #4c1d95, #6d28d9)",
              boxShadow:
                "0 0 140px rgba(124,58,237,0.8), 0 24px 60px rgba(15,23,42,0.95)",
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative flex h-[70%] w-[70%] items-center justify-center rounded-full bg-black/85 border border-white/10 backdrop-blur-xl">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-[10px] uppercase tracking-[0.35em] text-white/45">
                  Venture Lab
                </span>
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e5deff] to-white">
                  Skills
                </span>
              </div>

              {/* subtle inner glow ring */}
              <div className="pointer-events-none absolute inset-[-18%] rounded-full border border-purple-400/40 opacity-40 blur-[2px]" />
            </div>
          </motion.div>

          {/* skill icons on orbits */}
          {renderRing(outerSkills, outerRadius, 1.1, 0, orbitBoxSize)}
          {renderRing(innerSkills, innerRadius, 1.15, 1, orbitBoxSize)}

          {/* tiny ambient dust */}
          <AmbientDots />
        </div>
      </div>
    </section>
  );
}

type IconProps = {
  skill: Skill;
  index: number;
  floatingOffset: number;
  boxSize: number;
  disableFloat?: boolean;
};

function MagneticSkillIcon({
  skill,
  index,
  floatingOffset,
  boxSize,
  disableFloat,
}: IconProps) {
  const floatAnim = {
    y: [0, -6 - floatingOffset * 1.5, 0],
  };

  const iconSize = Math.max(26, Math.round(boxSize * 0.56));

  return (
    <motion.button
      type="button"
      className="group relative flex flex-col items-center gap-2 outline-none"
      animate={disableFloat ? undefined : floatAnim}
      transition={
        disableFloat
          ? undefined
          : {
              duration: 4 + floatingOffset * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }
      }
    >
      <div
        className="relative flex items-center justify-center rounded-full border border-white/12 bg-black/80 backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110"
        style={{
          width: boxSize,
          height: boxSize,
          boxShadow:
            "0 18px 45px rgba(15,23,42,0.9), 0 0 0 0 rgba(168,85,247,0.0)",
        }}
      >
        {/* purple highlight ring */}
        <motion.div
          className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{
            background:
              "conic-gradient(from 140deg, rgba(109,40,217,0.9), rgba(168,85,247,0.15), transparent 60%)",
            boxShadow: "0 0 30px rgba(168,85,247,0.9)",
          }}
          transition={{ duration: 0.2 }}
        />
        <Image
          src={skill.icon}
          alt={skill.name}
          width={iconSize}
          height={iconSize}
          className="relative z-10 object-contain"
        />
      </div>
      <span className="pointer-events-none select-none text-[11px] font-medium uppercase tracking-[0.18em] text-white/45 group-hover:text-white/80">
        {skill.name}
      </span>
    </motion.button>
  );
}

function AmbientDots() {
  const dots = Array.from({ length: 18 });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {dots.map((_, i) => {
        const x = (i * 63) % 100;
        const y = (i * 41) % 100;
        return (
          <motion.span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-white/15"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.3, 1] }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        );
      })}
    </div>
  );
}