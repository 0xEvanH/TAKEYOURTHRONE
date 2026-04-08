import { GOLD, GOLD_A } from "../constants";
import { SectionLabel } from "./UI";
import { Footer } from "./Footer";
import useSEO from "../hooks/useSEO";

const LAST_UPDATED = "8 April 2026";
const CONTACT_EMAIL = "TYTgaming2025@gmail.com";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div
    style={{
      marginBottom: 56,
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      paddingBottom: 28,
    }}
  >
    <h2
      className="fd"
      style={{
        color: "#fff",
        fontWeight: 600,
        fontSize: "clamp(22px,2.5vw,32px)",
        marginBottom: 16,
        letterSpacing: "0.04em",
      }}
    >
      {title}
    </h2>

    <div
      className="fb"
      style={{
        color: "rgba(255,255,255,0.65)",
        lineHeight: 1.8,
        fontSize: 13,
        maxWidth: 760,
      }}
    >
      {children}
    </div>
  </div>
);

const PrivacyPage = () => {
  useSEO({
    title: "Privacy Policy",
    description:
      "TAKE YOUR THRONE privacy policy — how we collect, use and protect your data.",
    url: "/privacy",
  });

  return (
    <div style={{ background: "#0c0c0c" }}>
      {/* HEADER */}
      <section
        style={{
          padding: "120px 80px 72px",
          background: "#090909",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${GOLD_A(
              0.045
            )} 1px,transparent 1px),linear-gradient(90deg,${GOLD_A(
              0.045
            )} 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        <div style={{ position: "relative", maxWidth: 960 }}>
          <SectionLabel text="Legal" />

          <h1
            className="fd"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "clamp(48px,7vw,96px)",
              lineHeight: 0.9,
              marginBottom: 18,
            }}
          >
            PRIVACY <span style={{ color: GOLD }}>Policy</span>
          </h1>

          <p
            className="fb"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Last updated — {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section
        style={{
          padding: "104px 80px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <Section title="1. Introduction">
          <p>
            TAKE YOUR THRONE ("we", "us", or "our") operates this website. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our platform.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>
            We may collect personal data such as your name, email address, and
            usage information including IP address, browser type, pages visited,
            and time spent on the site.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul
            style={{
              paddingLeft: 18,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <li>Operate and maintain the platform</li>
            <li>Respond to enquiries</li>
            <li>Improve performance and user experience</li>
            <li>Ensure platform security</li>
          </ul>
        </Section>

        <Section title="4. Contact Us">
          <p>
            Questions about this Privacy Policy can be sent to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{
                color: GOLD,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;