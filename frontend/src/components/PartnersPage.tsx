import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GOLD, PURPLE, GOLD_A } from "../constants";
import { PARTNER_TIERS } from "../data";
import { PageHero, SectionLabel } from "./UI";
import { Footer } from "./Footer";
import latency from "/paragon.jpg";

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
        <div style={{ padding: "0 80px", marginBottom: 60, textAlign: "center" }}>
          <SectionLabel text="All Partners" />
        </div>

        {/* Updated Container: Flex Wrap & Centered */}
        <div 
          ref={rowRef} 
          style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center", 
            gap: 32, 
            padding: "0 5vw",
            maxWidth: 1600,
            margin: "0 auto"
          }}
        >
          {allPartners.map((p, i) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={rowVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.07,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1]
                }}
                style={{
                  background: "#0f0f0f",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "48px 40px",
                  // Dynamic width to make Title Partner stand out
                  width: p.tier === "TITLE PARTNER" ? 460 : 360,
                  borderTop: `3px solid ${topBorderColor(p.tier)}`,
                  borderBottom: "3px solid transparent",
                  transition: "all 0.2s",
                }}
                whileHover={{
                  backgroundColor: `${GOLD}0a`,
                  borderBottomColor: GOLD,
                  scale: 1.02
                } as any}
              >
                <div
                  className="fb"
                  style={{ 
                    fontWeight: 700, 
                    textTransform: "uppercase", 
                    marginBottom: 24, 
                    fontSize: p.tier === "TITLE PARTNER" ? 11 : 9, 
                    letterSpacing: "0.35em", 
                    color: p.tier === "TITLE PARTNER" ? GOLD : "rgba(255,255,255,0.25)" 
                  }}
                >
                  {p.tier}
                </div>
                
                {/* Bigger Icon Container */}
                <div style={{
                  width: p.tier === "TITLE PARTNER" ? 84 : 68, 
                  height: p.tier === "TITLE PARTNER" ? 84 : 68, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  marginBottom: 24,
                  background: p.tier === "TITLE PARTNER" ? GOLD_A(0.12) : "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.tier === "TITLE PARTNER" ? GOLD_A(0.3) : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "8px"
                }}>
                  <img src={latency} alt={p.name} style={{ maxWidth: "70%", maxHeight: "70%", objectFit: "contain" }} />
                </div>

                <h3 className="fd" style={{ 
                  fontWeight: 600, 
                  marginBottom: 12, 
                  fontSize: p.tier === "TITLE PARTNER" ? 24 : 20, 
                  lineHeight: 1.1, 
                  color: p.tierColor 
                }}>
                  {p.name}
                </h3>
                
                <p className="fb" style={{ 
                  color: "rgba(255,255,255,0.4)", 
                  lineHeight: 1.6, 
                  marginBottom: 20, 
                  fontSize: 13 
                }}>
                  {p.desc}
                </p>
                
                <div className="fb" style={{ 
                  color: "rgba(255,255,255,0.2)", 
                  fontWeight: 700, 
                  textTransform: "uppercase", 
                  fontSize: 10, 
                  letterSpacing: "0.25em",
                  marginTop: "auto"
                }}>
                  SINCE {p.since}
                </div>
              </motion.div>
            </a>
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