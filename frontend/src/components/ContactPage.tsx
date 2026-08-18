import { motion } from "framer-motion";
import { SiDiscord } from "react-icons/si";
import { FiMail } from "react-icons/fi";
import { GOLD_A, EASE_SIGNATURE, DISCORD_URL } from "../constants";
import { PageHero } from "./UI";
import { Footer } from "./Footer";
import { CONTACT_EMAIL } from "./LegalSection";
import useSEO from "../hooks/useSEO";

export function ContactPage() {
  useSEO({
    title: "Contact",
    description: "Get in touch with TAKE YOUR THRONE on Discord.",
    url: "/contact",
  });

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <PageHero
        label="Contact"
        title="GET"
        titleAccent="In Touch"
        sub="Roster questions, partnership enquiries, or just want to talk shop: the fastest way to reach us is Discord."
      />

      <div style={{ background: "#090909", padding: "96px 80px 120px", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, maxWidth: 1000, width: "100%", justifyContent: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SIGNATURE }}
            className="glass-card"
            style={{ flex: "1 1 420px", maxWidth: 480, padding: "56px 48px", textAlign: "center" }}
          >
            <div
              style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 24px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(88,101,242,0.12)", border: "1px solid rgba(88,101,242,0.35)",
                color: "#5865F2",
              }}
            >
              <SiDiscord size={28} />
            </div>
            <h2 className="fd" style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", marginBottom: 14 }}>
              TALK TO US ON DISCORD
            </h2>
            <p className="fb" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, marginBottom: 32, maxWidth: 420, margin: "0 auto 32px" }}>
              Our community, staff, and players are all there. Drop in, say hello, and someone will get back to you.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 40px", fontSize: 12 }}
            >
              <SiDiscord size={17} />
              JOIN THE DISCORD
            </a>
            <div className="fb" style={{ marginTop: 20, fontSize: 10.5, letterSpacing: "0.18em", color: GOLD_A(0.6) }}>
              discord.gg/JebVtbMTh6
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_SIGNATURE }}
            className="glass-card"
            style={{ flex: "1 1 420px", maxWidth: 480, padding: "56px 48px", textAlign: "center" }}
          >
            <div
              style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 24px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: GOLD_A(0.12), border: `1px solid ${GOLD_A(0.35)}`,
                color: "#f0a500",
              }}
            >
              <FiMail size={26} />
            </div>
            <h2 className="fd" style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(26px,3vw,36px)", marginBottom: 14 }}>
              EMAIL US DIRECTLY
            </h2>
            <p className="fb" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, marginBottom: 32, maxWidth: 420, margin: "0 auto 32px" }}>
              Prefer email? Partnerships, press, or anything that needs a paper trail — this goes straight to the team.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 40px", fontSize: 12 }}
            >
              <FiMail size={16} />
              SEND AN EMAIL
            </a>
            <div className="fb" style={{ marginTop: 20, fontSize: 10.5, letterSpacing: "0.18em", color: GOLD_A(0.6) }}>
              {CONTACT_EMAIL}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
