import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GOLD, PURPLE, GOLD_A } from "../constants";
import { PARTNER_TIERS } from "../data";
import { PageHero, SectionLabel } from "./UI";
import { Footer } from "./Footer";
import latency from "/latency.jpg";

const allPartners = PARTNER_TIERS.flatMap(tier =>
  tier.partners.map(p => ({ ...p, tier: tier.tier, tierColor: tier.color }))
);

const topBorderColor = (tier: string) =>
  tier === "TITLE PARTNER" ? GOLD :
    tier === "PREMIUM PARTNER" ? "rgba(255,255,255,0.18)" :
      "rgba(255,255,255,0.07)";

export function PartnersPage() {
  const rowRef = useRef<HTMLDivElement>(null);
  const rowVisible = useInView(rowRef, { once: true, margin: "-80px" });

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <PageHero
        label="Partners"
        title="OUR"
        titleAccent="Partners"
        sub="We collaborate with the best in gaming, technology, and performance to give our players every possible edge."
      />

      <div style={{ background: "#090909", paddingTop: 72, paddingBottom: 88 }}>
        <div style={{ padding: "0 80px", marginBottom: 40 }}>
          <SectionLabel text="All Partners" />
        </div>

        <div ref={rowRef} className="hide-scrollbar" style={{ display: "flex", overflowX: "auto", gap: 1, padding: "0 80px" }}>
          {allPartners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }} animate={rowVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "#0f0f0f", cursor: "pointer", flexShrink: 0,
                padding: "36px 32px", width: 260,
                borderTop: `2px solid ${topBorderColor(p.tier)}`,
                borderBottom: "2px solid transparent",
                transition: "all 0.2s",
              }}
              whileHover={{ backgroundColor: `${GOLD}0a`, borderBottomColor: GOLD } as any}
            >
              <div
                className="fb"
                style={{ fontWeight: 700, textTransform: "uppercase", marginBottom: 20, fontSize: 8, letterSpacing: "0.35em", color: p.tier === "TITLE PARTNER" ? GOLD : "rgba(255,255,255,0.25)" }}
              >
                {p.tier}
              </div>
              <div style={{
                width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
                background: p.tier === "TITLE PARTNER" ? GOLD_A(0.12) : "rgba(255,255,255,0.04)",
                border: `1px solid ${p.tier === "TITLE PARTNER" ? GOLD_A(0.3) : "rgba(255,255,255,0.08)"}`,
              }}>
                <img src={latency} alt={p.name} style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }} />
              </div>
              <h3 className="fd" style={{ fontWeight: 600, marginBottom: 10, fontSize: 18, lineHeight: 1.1, color: p.tierColor }}>{p.name}</h3>
              <p className="fb" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 14, fontSize: 11.5 }}>{p.desc}</p>
              <div className="fb" style={{ color: "rgba(255,255,255,0.2)", fontWeight: 700, textTransform: "uppercase", fontSize: 9, letterSpacing: "0.25em" }}>
                SINCE {p.since}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ background: "#0c0c0c", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "88px 80px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <span className="fb" style={{ color: GOLD, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 16, fontSize: 10, letterSpacing: "0.4em" }}>
            PARTNERSHIP ENQUIRIES
          </span>
          <h2 className="fd" style={{ color: "#fff", fontWeight: 700, marginBottom: 20, fontSize: "clamp(36px,5vw,72px)", lineHeight: 0.9 }}>
            GROW WITH{" "}
            <span className="fs" style={{ color: PURPLE }}>Take Your Throne</span>
          </h2>
          <p className="fb" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 32, fontSize: 13 }}>
            We offer tailored partnership packages across jersey branding, social media, content integrations, and live event activations.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:TYTgaming2025@gmail.com"
              className="btn-gold"
              style={{ padding: "13px 32px", display: "inline-block" }}
            >
              GET IN TOUCH →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
