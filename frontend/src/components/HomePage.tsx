import { useRef, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { GOLD, PURPLE, GOLD_A, EASE_SIGNATURE } from "../constants";
import { DIVISIONS } from "../data";
import { Ticker, PlatformIcon } from "./UI";
import { ThreeBackdrop } from "./ThreeBackdrop";
import { Footer } from "./Footer";
import { useFeed, timeAgo } from "../hooks/UseFeed";
import video from "/video.mp4";
import useSEO from "../hooks/useSEO";

const bracketPositions: CSSProperties[] = [
  { top: 76, left: 40, borderTop: `1.5px solid ${GOLD_A(0.35)}`, borderLeft: `1.5px solid ${GOLD_A(0.35)}` },
  { top: 76, right: 40, borderTop: `1.5px solid ${GOLD_A(0.35)}`, borderRight: `1.5px solid ${GOLD_A(0.35)}` },
  { bottom: 52, left: 40, borderBottom: `1.5px solid ${GOLD_A(0.35)}`, borderLeft: `1.5px solid ${GOLD_A(0.35)}` },
  { bottom: 52, right: 40, borderBottom: `1.5px solid ${GOLD_A(0.35)}`, borderRight: `1.5px solid ${GOLD_A(0.35)}` },
];

const heroStats: [string, string][] = [["1", "TITLES"], ["16", "WINS"], ["500", "MEMBERS"]];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="wipe-flash" style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", background: "#080808" }}>
      <video src={video} autoPlay loop muted style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) grayscale(20%)" }} />
      <ThreeBackdrop variant="hero" />
      <div className="absolute pointer-events-none" style={{ bottom: -100, left: -100, width: 700, height: 700, background: `radial-gradient(circle,${GOLD_A(0.09)} 0%,transparent 65%)` }} />

      {bracketPositions.map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ width: 22, height: 22, filter: `drop-shadow(0 0 6px ${GOLD_A(0.3)})`, ...s }} />
      ))}

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="hero-badge"
        style={{
          position: "absolute", top: 88, left: 56, display: "flex", alignItems: "center", gap: 9,
          padding: "7px 16px", borderRadius: 999, background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)", border: `1px solid ${GOLD_A(0.25)}`,
        }}
      >
        <span className="fb" style={{ color: GOLD, fontWeight: 600, fontSize: 10, letterSpacing: "0.3em" }}>EST. 2025</span>
      </motion.div>

      {/* Plain flex wrapper owns the vertical centering — a motion.div can't
          safely mix a hand-written `transform` in `style` with framer's own
          x/y animation props, since framer overwrites the whole `transform`
          property with the one it computes from `animate`, silently
          dropping translateY(-50%). Centering lives here instead, outside
          framer's control.
          Below 768px this whole block is repositioned to a compact row
          near the top instead of vertically centered — see .hero-stats /
          .hero-stats-row / .hero-stat-num in GLOBAL_CSS. At full width it
          would sit directly on top of the headline, which is what was
          happening before (the headline's `right: 38%` and this block's
          numbers both assumed far more horizontal room than a phone has). */}
      <div className="hero-stats" style={{ position: "absolute", inset: 0, right: 66, display: "flex", alignItems: "center", justifyContent: "flex-end", pointerEvents: "none" }}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE_SIGNATURE }}
          className="hero-stats-row"
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", pointerEvents: "auto" }}
        >
          {heroStats.map(([n, label], idx) => (
            <div key={label} className="hero-stat" style={{ textAlign: "right", padding: "14px 0", width: 190, borderBottom: idx < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div className="fd hero-stat-num" style={{ color: GOLD, fontWeight: 900, fontSize: "clamp(64px,7vw,108px)", lineHeight: 0.9, textShadow: `0 0 40px ${GOLD_A(0.35)}` }}>{n}</div>
              <div className="fb hero-stat-label" style={{ color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 8, fontSize: 10, letterSpacing: "0.35em" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute pointer-events-none select-none hero-watermark" style={{ right: -60, top: "50%", transform: "translateY(-52%)", lineHeight: 0.85 }}>
        <span className="fd" style={{ fontSize: "clamp(180px,20vw,320px)", fontWeight: 900, WebkitTextStroke: `1.5px ${GOLD_A(0.08)}`, WebkitTextFillColor: "transparent", letterSpacing: "0.04em" } as CSSProperties}>
          TYT
        </span>
      </div>

      <motion.div className="hero-headline" style={{ position: "absolute", bottom: 72, left: 56, right: "38%", y: textY, opacity: textOpacity }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="fb"
          style={{ color: GOLD, fontWeight: 700, textTransform: "uppercase", marginBottom: 18, fontSize: 10, letterSpacing: "0.4em" }}
        >
          Welcome to
        </motion.p>
        <div style={{ overflow: "hidden" }}>
          <motion.h1 className="fd" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: EASE_SIGNATURE }}
            style={{ color: "#fff", fontWeight: 900, display: "block", fontSize: "clamp(64px,9.8vw,148px)", lineHeight: 0.9, letterSpacing: "0.04em" }}>
            TAKE YOUR
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.h1 className="fs" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.65, duration: 0.9, ease: EASE_SIGNATURE }}
            style={{ display: "block", fontSize: "clamp(64px,9.8vw,144px)", fontWeight: 200, lineHeight: 1.1, WebkitTextFillColor: PURPLE } as CSSProperties}>
            Throne
          </motion.h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
          <button className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 10 }} onClick={() => navigate("/teams")}>
            VIEW ROSTERS →
          </button>
        </motion.div>
      </motion.div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <Ticker />
      </div>
    </section>
  );
}

function Divisions() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const visible = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background: "#0c0c0c", padding: "104px 80px" }}>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <h2 className="fd" style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(42px,6vw,84px)", lineHeight: 0.9, marginBottom: 56 }}>
          COMPETE
        </h2>
      </motion.div>

      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        {DIVISIONS.map((d, i) => (
          <motion.div
            key={d.id}
            className="glass-card"
            initial={{ opacity: 0, y: 36 }} animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.11, duration: 0.7, ease: EASE_SIGNATURE }}
            onClick={() => navigate("/teams")}
            style={{ padding: "44px 40px 36px", cursor: "pointer" }}
          >
            <div className="fb" style={{ color: GOLD, fontWeight: 700, textTransform: "uppercase", marginBottom: 14, fontSize: 9.5, letterSpacing: "0.32em" }}>
              {d.players.length} Players
            </div>
            <h3 className="fd" style={{ color: "#fff", fontWeight: 600, fontSize: "clamp(26px,2.8vw,40px)", lineHeight: 1, marginBottom: 28 }}>
              {d.name}
            </h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="fb" style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", fontSize: 9.5, letterSpacing: "0.25em" }}>{d.rank}</span>
              <span className="card-arrow" style={{ color: GOLD, fontSize: 18 }}>→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PostCardSkeleton() {
  return (
    <div className="glass-card" style={{ overflow: "hidden" }}>
      <div style={{ aspectRatio: "16/9", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ padding: "16px 18px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ width: 80, height: 9, borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          <div style={{ height: 9, borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
          <div style={{ height: 9, borderRadius: 2, background: "rgba(255,255,255,0.06)", width: "75%" }} />
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 10 }} />
        <div style={{ width: 50, height: 9, borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
      </div>
    </div>
  );
}

function SocialPreview() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const visible = useInView(ref, { once: true, margin: "-80px" });
  const { posts, status } = useFeed();

  const preview = posts.slice(0, 3);
  const isLoading = status === "loading" && posts.length === 0;

  return (
    <section ref={ref} style={{ background: "#0c0c0c", padding: "104px 80px" }}>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <h2 className="fd" style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(42px,6vw,84px)", lineHeight: 0.9 }}>
            SOCIAL <span className="fs" style={{ color: PURPLE }}>Feed</span>
          </h2>
          <button
            className="fb"
            onClick={() => navigate("/news")}
            style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", cursor: "pointer", background: "transparent", border: 0, fontSize: 10, letterSpacing: "0.25em", transition: "color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)"; }}
          >
            ALL POSTS →
          </button>
        </div>
      </motion.div>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
          : preview.map((post, i) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.11, duration: 0.65, ease: EASE_SIGNATURE }}
                style={{ cursor: "pointer", textDecoration: "none", display: "block", overflow: "hidden" }}
              >
                {post.image && (
                  <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
                    <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%)" }} />
                  </div>
                )}
                <div style={{ padding: "16px 18px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                    <PlatformIcon platform="x" size={13} />
                    <span className="fb" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 700, fontSize: 10 }}>@tyt_esport</span>
                    <span className="fb" style={{ color: "rgba(255,255,255,0.2)", marginLeft: "auto", fontSize: 9.5 }}>{timeAgo(post.publishedAt)}</span>
                  </div>
                  <p className="fb" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 12, fontSize: 12, whiteSpace: "pre-line" }}>
                    {post.text.length > 120 ? post.text.slice(0, 120) + "…" : post.text}
                  </p>
                  <div style={{ paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="fb" style={{ color: GOLD, fontWeight: 700, fontSize: 9.5, letterSpacing: "0.18em" }}>VIEW ON X →</span>
                  </div>
                </div>
              </motion.a>
            ))
        }
      </div>

      {!isLoading && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", marginTop: 48 }}
        >
          <button
            className="btn-ghost"
            onClick={() => navigate("/news")}
            style={{ padding: "14px 48px", fontSize: 10.5, letterSpacing: "0.2em" }}
          >
            SHOW ALL POSTS →
          </button>
        </motion.div>
      )}
    </section>
  );
}

function MerchCTA() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const visible = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ position: "relative", background: "#090909", overflow: "hidden", padding: "104px 80px" }}>
      <ThreeBackdrop variant="subtle" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(9,9,9,0.5) 0%,transparent 100%)" }} />
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}>
        <motion.div initial={{ opacity: 0, x: -36 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="fb" style={{ color: GOLD, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 18, fontSize: 10, letterSpacing: "0.4em" }}>
            2026 MERCH DROP
          </span>
          <h2 className="fd" style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(42px,6vw,84px)", lineHeight: 0.9 }}>
            WEAR THE COLORS
          </h2>
          <p className="fb" style={{ color: "rgba(255,255,255,0.4)", marginTop: 20, maxWidth: 380, lineHeight: 1.7, fontSize: 12.5 }}>
            Official TAKE YOUR THRONE jerseys, hoodies, and accessories. Represent the squad on and off the server.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 36 }} animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}
        >
          <button className="btn-gold" style={{ padding: "15px 38px", fontSize: 11 }} onClick={() => navigate("/shop")}>
            SHOP COLLECTION →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePage() {
  useSEO({
      title: "Home",
      description:
        "TAKE YOUR THRONE - the ultimate competitive gaming experience.",
      url: "/",
    });

  return (
    <div>
      <Hero />
      <Divisions />
      <SocialPreview />
      <MerchCTA />
      <Footer />
    </div>
  );
}