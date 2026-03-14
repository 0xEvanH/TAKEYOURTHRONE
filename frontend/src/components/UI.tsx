import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import { GOLD, PURPLE, GOLD_A, TICKER_ITEMS } from "../constants";
import type { SocialPost } from "../data";
import logo from "/logo.svg";

export function LogoMark() {
  return (
    <img src={logo} alt="Take Your Throne Logo" style={{ width: 32, height: 32 }} />
  );
}

export function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
      <span
        className="fb"
        style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", whiteSpace: "nowrap" }}
      >
        {text}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

interface PageHeroProps {
  label: string;
  title: string;
  titleAccent?: string;
  sub?: string;
}

export function PageHero({ label, title, titleAccent, sub }: PageHeroProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "88px 80px 80px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GOLD_A(0.04)} 1px,transparent 1px),linear-gradient(90deg,${GOLD_A(0.04)} 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ bottom: -100, left: -100, width: 600, height: 600, background: `radial-gradient(circle,${GOLD_A(0.1)} 0%,transparent 65%)` }}
      />
      <div className="relative" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span
            className="fb"
            style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", display: "block", marginBottom: 16 }}
          >
            {label}
          </span>
          <h1 className="fd" style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(52px,7vw,100px)", lineHeight: 0.88 }}>
            {title}{" "}
            {titleAccent && (
              <span
                className="fs"
                style={{ color: PURPLE, fontSize: "clamp(50px,6.8vw,98px)" } as CSSProperties}
              >
                {titleAccent}
              </span>
            )}
          </h1>
          {sub && (
            <p className="fb" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, maxWidth: 480, lineHeight: 1.7, marginTop: 20 }}>
              {sub}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ background: GOLD, height: 34, overflow: "hidden", display: "flex", alignItems: "center" }}>
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span
            key={i}
            className="fb"
            style={{
              color: "#000", fontWeight: 700, textTransform: "uppercase",
              display: "flex", alignItems: "center", whiteSpace: "nowrap",
              fontSize: 9.5, letterSpacing: "0.28em", padding: "0 28px", gap: 28,
            }}
          >
            {item}
            <span style={{ opacity: 0.4, fontSize: 7 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const iconPaths: Record<string, string> = {
  x: "M4 4l5.4 7.2L4 18h1.5l4.7-5.3L14.2 18H18l-5.7-7.6L17.5 4H16l-4.3 4.9L8 4H4zm1.8 1h1.8l8.6 11.4H14.4L5.8 5z",
  youtube: "M19.6 7s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.8C14.4 4 12 4 12 4s-2.4 0-4.8.2c-.4 0-1.3 0-2 .8-.6.6-.8 2-.8 2S4 8.6 4 10.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.7 2.2.8C8.8 17.9 12 18 12 18s2.4 0 4.8-.3c.4 0 1.3 0 2-.8.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C20 8.6 19.6 7 19.6 7zM10 14.5v-5l5.5 2.5-5.5 2.5z",
  tiktok: "M19 6.8a4.9 4.9 0 01-3-1 4.9 4.9 0 01-1.9-3.8H11v10.7a2.1 2.1 0 01-2.1 1.8 2.1 2.1 0 01-2.1-2.1 2.1 2.1 0 012.1-2.1c.2 0 .4 0 .6.1V7.2a5.4 5.4 0 00-.6 0 5.4 5.4 0 00-5.4 5.4 5.4 5.4 0 005.4 5.4 5.4 5.4 0 005.4-5.4V8.5a8.1 8.1 0 004.7 1.5V6.8z",
  instagram: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.3 2.2 12c0-3.2 0-3.6.1-4.8.1-3.3 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-2.3.1-3.4 1.2-3.5 3.5-.1 1.2-.1 1.6-.1 4.7 0 3.1 0 3.5.1 4.7.1 2.3 1.1 3.4 3.5 3.5 1.2.1 1.6.1 4.7.1 3.1 0 3.5 0 4.7-.1 2.3-.1 3.4-1.2 3.5-3.5.1-1.2.1-1.6.1-4.7 0-3.1 0-3.5-.1-4.7-.1-2.3-1.2-3.4-3.5-3.5-1.2-.1-1.6-.1-4.7-.1zm0 3a5 5 0 110 10 5 5 0 010-10zm0 1.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4zm5.2-.9a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
};

const iconColors: Record<string, string> = {
  x: "#fff",
  youtube: "#FF0000",
  tiktok: "#fff",
  instagram: "#E1306C",
};

export function PlatformIcon({ platform, size = 16 }: { platform: SocialPost["platform"]; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={iconColors[platform]}>
      <path d={iconPaths[platform]} />
    </svg>
  );
}
