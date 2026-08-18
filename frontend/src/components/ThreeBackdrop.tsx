import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// The actual three.js/@react-three scene is code-split into its own chunk —
// this wrapper stays cheap (a capability check + an IntersectionObserver)
// so pages that skip the backdrop (reduced motion, no WebGL) never pay for
// the dependency at all, and pages that do use it don't block on it.
const ThreeScene = lazy(() => import("./ThreeScene"));

interface ThreeBackdropProps {
  /** "hero" = larger/denser field for the homepage hero. "subtle" = a
   *  quieter version reused behind PageHero banners across inner pages. */
  variant?: "hero" | "subtle";
  className?: string;
}

/**
 * Ambient gold/purple particle field, layered behind existing hero/banner
 * content for depth. Not a focal 3D object — it sits under the video/grid
 * overlays already there and stays low-opacity.
 *
 * Degrades to rendering nothing (parent's existing CSS gradient/grid layers
 * are the fallback) when: the user prefers reduced motion, WebGL isn't
 * available, or the container is off-screen (frameloop paused via
 * IntersectionObserver rather than unmounting, so it resumes instantly).
 */
export function ThreeBackdrop({ variant = "subtle", className }: ThreeBackdropProps) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  // Lazy initializer, not an effect — this is a synchronous capability
  // check with no external subscription, so it needs no render cycle to
  // settle.
  const [supported] = useState(() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch {
      return false;
    }
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (reduced || !supported) return null;

  const isHero = variant === "hero";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: isHero ? 0.85 : 0.5 }}
    >
      <Suspense fallback={null}>
        <ThreeScene isHero={isHero} visible={visible} />
      </Suspense>
    </div>
  );
}
