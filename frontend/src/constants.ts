export const GOLD = "#f0a500";
export const PURPLE = "#7c3aed";
export const GOLD_A = (a: number) => `rgba(240,165,0,${a})`;
export const PURPLE_A = (a: number) => `rgba(124,58,237,${a})`;

// Glow recipes — layered soft + wide box-shadow, used on hover/active states
// so surfaces read as lit rather than flat. `intensity` scales both radius
// and opacity together so callers get one dial, not four numbers to tune.
export const GOLD_GLOW = (intensity: number = 1) =>
  `0 0 ${Math.round(14 * intensity)}px rgba(240,165,0,${(0.34 * intensity).toFixed(2)}), 0 0 ${Math.round(34 * intensity)}px rgba(240,165,0,${(0.1 * intensity).toFixed(2)})`;
export const PURPLE_GLOW = (intensity: number = 1) =>
  `0 0 ${Math.round(14 * intensity)}px rgba(124,58,237,${(0.34 * intensity).toFixed(2)}), 0 0 ${Math.round(34 * intensity)}px rgba(124,58,237,${(0.1 * intensity).toFixed(2)})`;

export const GOLD_GRADIENT = "linear-gradient(135deg, #ffd873 0%, #f0a500 48%, #c97e00 100%)";
export const PURPLE_GRADIENT = "linear-gradient(135deg, #b79bfb 0%, #7c3aed 55%, #57249c 100%)";

// The site's one signature ease — was already used ad-hoc (copy-pasted) across
// most pages; naming it here so every entrance/transition pulls the same curve.
export const EASE_SIGNATURE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const PLATFORM_LABELS: Record<string, string> = {
  x: "X / Twitter",
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
};

export const PLATFORM_BG: Record<string, string> = {
  x: "#111",
  youtube: "#1a0000",
  tiktok: "#0d0d0d",
  instagram: "#1a0a12",
};

export const PLATFORM_ACCENT: Record<string, string> = {
  x: "rgba(255,255,255,0.12)",
  youtube: "rgba(255,0,0,0.15)",
  tiktok: "rgba(255,255,255,0.06)",
  instagram: "rgba(225,48,108,0.15)",
};

export const DISCORD_URL = "https://discord.gg/JebVtbMTh6";

export const TICKER_ITEMS = [
  "TAKE YOUR THRONE", "HONORA VINCENTIUM", "TAKE YOUR THRONE", "HONORA VINCENTIUM",
  "TAKE YOUR THRONE", "HONORA VINCENTIUM", "TAKE YOUR THRONE", "HONORA VINCENTIUM",
];

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;900&family=Pinyon+Script&family=Barlow:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #090909; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #090909; }
  ::-webkit-scrollbar-thumb { background: #f0a500; }
  ::selection { background: #f0a500; color: #000; }

  .fd { font-family: 'Big Shoulders Display', sans-serif; font-weight: 700; }
  .fs { font-family: 'Pinyon Script', cursive; }
  .fb { font-family: 'Barlow', sans-serif; }

  .ticker-inner {
    display: flex; width: max-content;
    animation: ticker 30s linear infinite;
  }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  @keyframes pdot {
    0%,100% { box-shadow: 0 0 0 0 rgba(240,165,0,0.5); }
    50%      { box-shadow: 0 0 0 5px rgba(240,165,0,0); }
  }
  .pdot { animation: pdot 2s ease infinite; }

  /* One-shot click feedback, spawned by ButtonBurst.tsx for any .btn-gold /
     .btn-ghost click. --dx/--dy (set inline per-particle) carry the travel
     vector; this is the only piece each particle needs from JS. */
  @keyframes burst-particle {
    0%   { transform: translate(-50%,-50%) translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(-50%,-50%) translate(var(--dx),var(--dy)) scale(0.15); opacity: 0; }
  }

  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* Primary CTA — gradient-fill pill. Idle state is a tight, low drop
     shadow (light, not haze); hover reveals a dithered gradient wipe
     (fine diagonal micro-lines + a gradient tint, scaled in from the left)
     for a more deliberate feel than a generic sheen. Click feedback is a
     separate one-shot burst, spawned by ButtonBurst.tsx (delegated off the
     .btn-gold class, not wired per-instance). */
  .btn-gold {
    position: relative; z-index: 0; padding: 13px 30px; border: none; border-radius: 999px;
    background: linear-gradient(135deg, #ffd873 0%, #f0a500 48%, #c97e00 100%);
    color: #000; font-family: 'Barlow', sans-serif; font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; overflow: hidden;
    box-shadow: 0 0 0 1px rgba(240,165,0,0.32), 0 6px 16px -9px rgba(240,165,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35);
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .btn-gold::before {
    content: ''; position: absolute; z-index: -1; inset: 0;
    background:
      repeating-linear-gradient(115deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 3px),
      linear-gradient(100deg, rgba(255,255,255,0.55), rgba(255,255,255,0.05));
    mix-blend-mode: overlay;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
    pointer-events: none;
  }
  .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(240,165,0,0.5), 0 10px 24px -10px rgba(240,165,0,0.6), inset 0 1px 0 rgba(255,255,255,0.4); }
  .btn-gold:hover::before { transform: scaleX(1); }
  .btn-gold:active { transform: translateY(0) scale(0.97); }

  /* Secondary/ghost CTA — glass surface with clipped corners, echoing the
     bracket-corner HUD motif used elsewhere in the brand instead of a plain
     rectangle. Same dither-wipe hover language, tuned for a transparent
     surface (tinted, not white). */
  .btn-ghost {
    position: relative; z-index: 0; padding: 13px 30px;
    background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.16); color: rgba(255,255,255,0.55);
    font-family: 'Barlow', sans-serif; font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
    clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
    transition: color 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s cubic-bezier(0.22,1,0.36,1), background 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .btn-ghost::before {
    content: ''; position: absolute; z-index: -1; inset: 0;
    background:
      repeating-linear-gradient(115deg, rgba(240,165,0,0.14) 0 1px, transparent 1px 3px),
      linear-gradient(100deg, rgba(240,165,0,0.18), rgba(124,58,237,0.1));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
    pointer-events: none;
  }
  .btn-ghost:hover { border-color: rgba(240,165,0,0.5); color: #fff; box-shadow: 0 0 16px -6px rgba(240,165,0,0.4); }
  .btn-ghost:hover::before { transform: scaleX(1); }

  /* Default modern surface: soft glass + a gradient-outline that fades in on
     hover (gold -> purple, masked to a 1px ring). This is the one new
     "modern" primitive most cards on the site now share. */
  .glass-card {
    position: relative; border-radius: 12px;
    background: rgba(255,255,255,0.035);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .glass-card::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
    background: linear-gradient(135deg, rgba(240,165,0,0.35), rgba(124,58,237,0.22) 55%, transparent 80%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    opacity: 0; transition: opacity 0.3s cubic-bezier(0.22,1,0.36,1); pointer-events: none;
  }
  .glass-card:hover {
    transform: translateY(-4px);
    border-color: rgba(240,165,0,0.3);
    background: rgba(255,255,255,0.05);
    box-shadow: 0 24px 52px -24px rgba(240,165,0,0.4);
  }
  .glass-card:hover::before { opacity: 1; }
  .glass-card .card-arrow { display: inline-block; transition: transform 0.25s cubic-bezier(0.22,1,0.36,1); }
  .glass-card:hover .card-arrow { transform: translateX(5px); }

  .hide-scrollbar::-webkit-scrollbar { display: none; }

  .shop-card { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); cursor: pointer; position: relative; overflow: hidden; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s cubic-bezier(0.22,1,0.36,1); }
  .shop-card:hover { transform: translateY(-4px); border-color: rgba(240,165,0,0.3); box-shadow: 0 24px 52px -24px rgba(240,165,0,0.4); }
  .shop-card:hover .shop-card-img { transform: scale(1.05); }
  .shop-card:hover .shop-card-reveal { opacity: 1; transform: translateY(0); }
  .shop-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
  .shop-card-reveal { opacity: 0; transform: translateY(8px); transition: opacity 0.25s cubic-bezier(0.22,1,0.36,1), transform 0.25s cubic-bezier(0.22,1,0.36,1); }
  .shop-card:hover .shop-card-overlay { background: rgba(0,0,0,0.35); }
  .shop-card-overlay { transition: background 0.3s cubic-bezier(0.22,1,0.36,1); }

  .social-btn {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); color: rgba(255,255,255,0.45);
    display: flex; align-items: center; justify-content: center; font-size: 14px;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .social-btn:hover { border-color: rgba(240,165,0,0.55); color: #f0a500; background: rgba(240,165,0,0.08); box-shadow: 0 0 22px -6px rgba(240,165,0,0.5); transform: translateY(-2px); }

  .footer-link { color: rgba(255,255,255,0.3); transition: color 0.2s cubic-bezier(0.22,1,0.36,1); }
  .footer-link:hover { color: #fff; }

  .post-img { filter: grayscale(25%); transition: filter 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1); }
  .glass-card:hover .post-img { filter: grayscale(0%); transform: scale(1.04); }

  .legal-link { color: #f0a500; font-weight: 700; text-decoration: none; transition: color 0.2s cubic-bezier(0.22,1,0.36,1), text-shadow 0.2s cubic-bezier(0.22,1,0.36,1); }
  .legal-link:hover { color: #ffcf4d; text-shadow: 0 0 16px rgba(240,165,0,0.5); }

  /* One-shot diagonal light sweep for big banner-scale surfaces (Hero,
     PageHero) — plays once when the element mounts, a "reveal flash"
     rather than a hover effect, since these surfaces are too large for a
     permanent hover treatment to read as anything but noise. */
  @keyframes wipe-flash {
    0%   { transform: translateX(-140%) skewX(-12deg); opacity: 0; }
    35%  { opacity: 1; }
    100% { transform: translateX(140%) skewX(-12deg); opacity: 0; }
  }
  .wipe-flash { position: relative; overflow: hidden; }
  .wipe-flash::after {
    content: ''; position: absolute; inset: -20% -10%; pointer-events: none; z-index: 6;
    background: linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.1) 48%, rgba(240,165,0,0.16) 51%, rgba(124,58,237,0.1) 54%, transparent 62%);
    animation: wipe-flash 1.6s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }

  /* Slow ambient drift for AmbientGradient.tsx blobs — a cheap alternative
     to another Three.js instance for filling otherwise-blank section
     background, kept to transform/opacity only. */
  @keyframes drift-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(4%,-6%) scale(1.12); } }
  @keyframes drift-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-5%,5%) scale(0.9); } }

  @media (prefers-reduced-motion: reduce) {
    .wipe-flash::after { animation: none; display: none; }
    .ambient-blob { animation: none !important; }
  }

  /* Hero was laid out with everything absolutely positioned assuming
     desktop-width breathing room (headline capped to the left 62% of the
     section, stat column vertically centered on the right, a giant ghost
     "TYT" watermark behind it all). On a phone that collapses into three
     things stacked on top of each other. Reflow instead of just shrinking
     type: watermark drops out (pure decoration, no room for it), the stat
     column becomes a compact row pinned near the top, and the headline
     gets the full width for the space that's left under it. */
  @media (max-width: 767px) {
    .hero-watermark { display: none !important; }
    .hero-badge { top: 84px !important; left: 20px !important; }
    .hero-stats {
      inset: auto !important; top: 130px !important; left: 20px !important; right: 20px !important;
      justify-content: flex-start !important;
    }
    .hero-stats-row { flex-direction: row !important; align-items: flex-start !important; gap: 22px; }
    .hero-stat { width: auto !important; padding: 0 !important; border-bottom: none !important; text-align: left !important; }
    .hero-stat-num { font-size: 30px !important; text-shadow: none !important; }
    .hero-stat-label { font-size: 8px !important; letter-spacing: 0.18em !important; margin-top: 4px !important; }
    .hero-headline { left: 20px !important; right: 20px !important; }
    .shop-filter-bar { padding-left: 20px !important; padding-right: 20px !important; }
  }

  /* Under 640px the full "Contact" pill is wide enough to sit on top of
     whatever text happens to be scrolled underneath it (it's fixed, so
     that's every scroll position, on every page) — collapse to an
     icon-only circle instead. */
  @media (max-width: 640px) {
    .contact-fab { padding: 13px !important; bottom: 18px !important; right: 18px !important; gap: 0 !important; }
    .contact-fab-label { display: none; }
  }

  /* Respect user motion preference: stop the looping/decorative animations.
     Entrance transitions (framer-motion) are left alone since they're brief
     one-shot fades, not sustained motion; the Three.js backdrop checks this
     same preference in JS via usePrefersReducedMotion. */
  @media (prefers-reduced-motion: reduce) {
    .ticker-inner { animation: none !important; }
    .pdot { animation: none !important; box-shadow: 0 0 0 3px rgba(240,165,0,0.25) !important; }
    .btn-gold::before, .btn-ghost::before { transition: none !important; }
    html { scroll-behavior: auto; }
  }
`;
