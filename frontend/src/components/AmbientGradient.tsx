import { GOLD_A, PURPLE_A } from "../constants";

interface AmbientGradientProps {
  /** Where the pair of blobs sit within their (relatively-positioned)
   *  container. Kept simple — two fixed compositions rather than a prop
   *  per coordinate, since this is decoration, not a layout primitive. */
  variant?: "corner" | "center";
  className?: string;
}

interface Blob {
  top?: string; left?: string; bottom?: string; right?: string;
  size: number; color: string; anim: string;
}

const CORNER: Blob[] = [
  { top: "-10%", left: "-8%", size: 420, color: GOLD_A(0.14), anim: "drift-a 22s ease-in-out infinite" },
  { bottom: "-15%", right: "-10%", size: 480, color: PURPLE_A(0.13), anim: "drift-b 26s ease-in-out infinite" },
];

const CENTER: Blob[] = [
  { top: "20%", left: "10%", size: 380, color: PURPLE_A(0.12), anim: "drift-a 24s ease-in-out infinite" },
  { bottom: "10%", right: "15%", size: 360, color: GOLD_A(0.12), anim: "drift-b 20s ease-in-out infinite" },
];

/**
 * Two large, slowly-drifting blurred blobs (gold + purple, transform/opacity
 * only) for filling otherwise-flat background in content-light sections —
 * a much cheaper alternative to another Three.js instance. Purely
 * decorative: aria-hidden, pointer-events none. `.ambient-blob` animation is
 * disabled under `prefers-reduced-motion` in GLOBAL_CSS (static blobs then,
 * not a jump-cut).
 */
export function AmbientGradient({ variant = "corner", className }: AmbientGradientProps) {
  const blobs = variant === "corner" ? CORNER : CENTER;

  return (
    <div aria-hidden="true" className={className} style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: -1 }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="ambient-blob"
          style={{
            position: "absolute", width: b.size, height: b.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: "blur(10px)", animation: b.anim,
            top: b.top, left: b.left, bottom: b.bottom, right: b.right,
          }}
        />
      ))}
    </div>
  );
}
