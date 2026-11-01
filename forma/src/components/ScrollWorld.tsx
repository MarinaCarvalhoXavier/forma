"use client";

import { useEffect, useRef } from "react";
import { brandName, world } from "@/data/content";

declare global {
  interface Window {
    mountScrollWorld?: (container: HTMLElement, config: unknown) => void;
  }
}

// Scroll-scrubbed camera walkthrough (scroll-world skill). The engine is a vendored,
// framework-free script in public/world/scrub-engine.js that builds its own DOM.
export default function ScrollWorld() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // The engine fades its last scene out as soon as the walkthrough ends, which left the
    // closing copy floating on a blank screen while About slid up over it. Hold the last
    // frame instead (see .sw-hold-last in globals.css), so About covers a finished picture.
    const holdLast = () => {
      const track = container.querySelector<HTMLElement>(".sw-track");
      if (!track) return;
      container.classList.toggle("sw-hold-last", window.scrollY >= track.offsetHeight - window.innerHeight);
    };
    window.addEventListener("scroll", holdLast, { passive: true });
    window.addEventListener("resize", holdLast);

    const mount = () => {
      // The engine has no unmount, so mount exactly once (React may run effects twice in dev).
      if (container.dataset.mounted || !window.mountScrollWorld) return;
      container.dataset.mounted = "true";
      window.mountScrollWorld(container, {
        ...world,
        brand: { name: brandName, href: "#top" },
        cta: { label: "Start a project", href: "#contact" },
        atmosphere: false,
      });
    };

    if (window.mountScrollWorld) {
      mount();
    } else {
      const script = document.createElement("script");
      script.src = "/world/scrub-engine.js";
      script.onload = mount;
      document.body.appendChild(script);
    }

    return () => {
      window.removeEventListener("scroll", holdLast);
      window.removeEventListener("resize", holdLast);
    };
  }, []);

  return <div id="top" ref={ref} />;
}
