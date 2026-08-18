import { useEffect, useRef } from "react";
import { GOLD, PURPLE } from "../constants";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const PARTICLE_COUNT = 7;

/**
 * Click feedback for every `.btn-gold` / `.btn-ghost` element, site-wide,
 * via a single delegated document click listener — not wired per button
 * instance. Mount once (App.tsx). Spawns a few gold/purple particles at the
 * click point that scatter outward and fade (`burst-particle` keyframe in
 * GLOBAL_CSS), then remove themselves.
 */
export function ButtonBurst() {
  const reduced = usePrefersReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(".btn-gold, .btn-ghost");
      const layer = layerRef.current;
      if (!target || !layer) return;

      const { clientX: x, clientY: y } = e;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.5;
        const dist = 24 + Math.random() * 20;
        const el = document.createElement("span");
        el.style.cssText = [
          "position:fixed", `left:${x}px`, `top:${y}px`, "width:5px", "height:5px",
          "border-radius:50%", `background:${i % 2 === 0 ? GOLD : PURPLE}`,
          "pointer-events:none", "z-index:9999",
          `--dx:${(Math.cos(angle) * dist).toFixed(1)}px`, `--dy:${(Math.sin(angle) * dist).toFixed(1)}px`,
          "animation:burst-particle 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        ].join(";");
        el.addEventListener("animationend", () => el.remove(), { once: true });
        layer.appendChild(el);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduced]);

  return <div ref={layerRef} aria-hidden="true" />;
}
