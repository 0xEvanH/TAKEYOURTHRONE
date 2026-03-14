export const GOLD = "#f0a500";
export const PURPLE = "#7c3aed";
export const GOLD_A = (a: number) => `rgba(240,165,0,${a})`;

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

export const TICKER_ITEMS = [
  "TAKE YOUR THRONE", "HONORA VINCENTIUM", "TAKE YOUR THRONE", "HONORA VINCENTIUM",
  "TAKE YOUR THRONE", "HONORA VINCENTIUM", "TAKE YOUR THRONE", "HONORA VINCENTIUM",
];

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600;1,700&family=Oswald:wght@400;500;600;700&family=Barlow:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #090909; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #090909; }
  ::-webkit-scrollbar-thumb { background: #f0a500; }
  ::selection { background: #f0a500; color: #000; }

  .fd { font-family: 'Oswald', sans-serif; }
  .fs { font-family: 'Cormorant Garamond', serif; }
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

  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  .btn-gold {
    padding: 12px 28px; background: #f0a500; border: none; color: #000;
    font-family: 'Barlow', sans-serif; font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-gold:hover { background: #ffb820; transform: scale(1.02); }

  .btn-ghost {
    padding: 12px 28px; background: transparent;
    border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.5);
    font-family: 'Barlow', sans-serif; font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.45); color: #fff; }

  .shop-card { background: #111; cursor: pointer; position: relative; overflow: hidden; transition: transform 0.25s ease; }
  .shop-card:hover { transform: translateY(-3px); }
  .shop-card:hover .shop-card-img { transform: scale(1.04); }
  .shop-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.45s ease; }
`;
