"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function BlobCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 200,
    damping: 26,
    mass: 0.4,
  });

  const springY = useSpring(y, {
    stiffness: 200,
    damping: 26,
    mass: 0.4,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      style={{
        translateX: springX,
        translateY: springY,
      }}
      className="
        fixed
        top-0 left-0
        -translate-x-1/2 -translate-y-1/2
        w-44 h-44
        pointer-events-none
        z-[999]
        rounded-full
        bg-gradient-to-br from-[#4b1576] to-[#7e22ce]
        opacity-100
        blur-[90px]
        mix-blend-screen
        brightness-200
      "
    />
  );
}
