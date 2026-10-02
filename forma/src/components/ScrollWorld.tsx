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

    if (window.mountScrollWorld) return mount();
    const script = document.createElement("script");
    script.src = "/world/scrub-engine.js";
    script.onload = mount;
    document.body.appendChild(script);
  }, []);

  return <div id="top" ref={ref} />;
}
