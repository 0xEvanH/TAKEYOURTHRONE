import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GOLD } from "../constants";
import { useFeed, timeAgo, type FeedPost } from "../hooks/UseFeed";
import { PageHero } from "./UI";
import { Footer } from "./Footer";
import { SiX } from "react-icons/si";

function Skeleton() {
  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#111" }}>
      <div style={{ aspectRatio: "16/9", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ padding: "18px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ width: 90, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
          <div style={{ height: 10, borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
          <div style={{ height: 10, borderRadius: 2, background: "rgba(255,255,255,0.06)", width: "80%" }} />
          <div style={{ height: 10, borderRadius: 2, background: "rgba(255,255,255,0.06)", width: "55%" }} />
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 12 }} />
        <div style={{ width: 60, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.06)" }} />
      </div>
    </div>
  );
}

function PostCard({ post, i, visible }: { post: FeedPost; i: number; visible: boolean }) {
  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#111", textDecoration: "none", display: "block" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {post.image && (
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9" }}>
          <img
            src={post.image}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(25%)", transition: "all 0.4s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"; (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(25%)"; (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
        </div>
      )}

      <div style={{ padding: "18px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <SiX size={18} />
            </div>
            <div>
              <div className="fb" style={{ color: "#fff", fontWeight: 700, fontSize: 11, lineHeight: 1.1 }}>@tyt_esport</div>
              <div className="fb" style={{ color: "rgba(255,255,255,0.3)", fontSize: 9.5 }}>X / Twitter</div>
            </div>
          </div>
          <span className="fb" style={{ color: "rgba(255,255,255,0.25)", fontSize: 9.5 }}>
            {timeAgo(post.publishedAt)}
          </span>
        </div>

        <p
          className="fb"
          style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 14, fontSize: 12.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {post.text}
        </p>

        <div style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "flex-end" }}>
          <span className="fb" style={{ color: GOLD, fontWeight: 700, fontSize: 10, letterSpacing: "0.15em" }}>
            VIEW ON X →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function NewsPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridVisible = useInView(gridRef, { once: true });
  const { posts, status, fetchedAt, refresh } = useFeed();

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <PageHero
        label="Social"
        title="LATEST"
        titleAccent="Content"
        sub="Live feed from @tyt_esport on X. Refreshes every 5 minutes."
      />

      <div ref={gridRef} style={{ background: "#090909", padding: "64px 80px 96px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {status === "ok" && (
              <>
                <span className="pdot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "block", flexShrink: 0 }} />
                <span className="fb" style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.2em" }}>LIVE</span>
              </>
            )}
            {status === "loading" && (
              <span className="fb" style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.2em" }}>LOADING...</span>
            )}
            {status === "error" && (
              <span className="fb" style={{ color: "#ef4444", fontSize: 10, letterSpacing: "0.2em" }}>FEED UNAVAILABLE</span>
            )}
            {fetchedAt && status === "ok" && (
              <span className="fb" style={{ color: "rgba(255,255,255,0.18)", fontSize: 9.5 }}>
                updated {new Date(fetchedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>

          <button
            onClick={refresh}
            className="fb"
            style={{ color: "rgba(255,255,255,0.3)", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", padding: "6px 14px", fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            ↻ REFRESH
          </button>
        </div>

        {status === "error" && posts.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div className="fd" style={{ color: "rgba(255,255,255,0.15)", fontSize: 28, marginBottom: 12 }}>Feed unavailable</div>
            <p className="fb" style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginBottom: 24 }}>
              Make sure the proxy server is running on port 3001 and RSS_URL is set in server/.env
            </p>
            <button onClick={refresh} className="btn-ghost" style={{ fontSize: 10 }}>TRY AGAIN</button>
          </div>
        )}

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))" }}>
          {status === "loading" && posts.length === 0
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
            : posts.map((post, i) => (
                <PostCard key={post.id} post={post} i={i} visible={gridVisible} />
              ))
          }
        </div>
      </div>

      <div style={{ background: "#0c0c0c", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "72px 80px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <span className="fb" style={{ color: GOLD, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 14, fontSize: 10, letterSpacing: "0.4em" }}>
            FOLLOW US
          </span>
          <h2 className="fd" style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: "clamp(32px,4vw,60px)", lineHeight: 0.9 }}>
            STAY IN THE LOOP
          </h2>
          <p className="fb" style={{ color: "rgba(255,255,255,0.35)", marginBottom: 28, fontSize: 13, lineHeight: 1.6 }}>
            Follow <strong style={{ color: "rgba(255,255,255,0.6)" }}>@tyt_esport</strong> for results, clips, and roster news.
          </p>
          <a
            href="https://x.com/tyt_esport"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 32px", textDecoration: "none" }}
          >
            <SiX size={18} />
            FOLLOW @TYT_ESPORT
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}