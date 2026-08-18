import { useEffect, useState } from "react";

/**
 * Tracks the `prefers-reduced-motion` media query. Used to gate
 * non-essential, sustained motion — chiefly the Three.js ambient
 * backdrop — in JS, mirroring the CSS `@media (prefers-reduced-motion)`
 * block in GLOBAL_CSS that handles the looping CSS animations.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
