"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { whenLayoutReady } from "@/lib/whenLayoutReady";

// Writes out the <Words> inside it as the visitor scrolls (styles: [data-write] in
// globals.css). Words appear in reading order, starting when the block enters the lower
// part of the screen and finishing about when the whole block is on screen. Written words stay
// written. Without JavaScript, or with reduced motion, the text is simply there.
export default function WriteOn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = [...el.querySelectorAll<HTMLElement>(".w")];
    let written = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (0.9 * vh - top) / (height + 0.1 * vh)));
      const target = Math.round(progress * words.length);
      for (; written < target; written++) words[written].classList.add("is-written");
      if (written === words.length) stop();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    el.dataset.write = "on";
    const cancel = whenLayoutReady(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    });
    return () => {
      cancel();
      stop();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
