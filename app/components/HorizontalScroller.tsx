"use client";

import React, { useRef } from "react";

type HorizontalScrollerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function HorizontalScroller({ className, children }: HorizontalScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= maxScroll - 1;

    // Convert vertical scroll to horizontal within bounds
    if ((e.deltaY < 0 && !atStart) || (e.deltaY > 0 && !atEnd)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
    // else: allow default vertical scroll to resume
  }

  return (
    <div ref={ref} onWheel={onWheel} className={className}>
      {children}
    </div>
  );
}