"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { whenLayoutReady } from "@/lib/whenLayoutReady";

// Reveals its image once, the first time it scrolls well into view (styles: .reveal in
// globals.css). Without JavaScript nothing is hidden.
export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "in";
        observer.disconnect();
      },
      // Start once the photo is a little way up the screen, so it is seen rising
      // from nothing rather than already part-way in.
      { rootMargin: "0px 0px -15% 0px" },
    );
    const cancel = whenLayoutReady(() => observer.observe(el));
    return () => {
      cancel();
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
