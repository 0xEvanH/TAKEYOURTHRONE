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

const TermsPage = () => {
  useSEO({
    title: "Terms of Service",
    description:
      "TAKE YOUR THRONE terms of service — rules governing use of the platform.",
    url: "/terms",
  });

  return (
    <div style={{ background: "#0c0c0c" }}>
      <section
        style={{
          padding: "120px 80px 72px",
          background: "#090909",
          position: "relative",
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
            TERMS <span style={{ color: GOLD }}>of Service</span>
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

      <section
        style={{
          padding: "104px 80px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using the TAKE YOUR THRONE platform, you agree to
            be bound by these Terms of Service.
          </p>
        </Section>

        <Section title="2. Use of the Platform">
          <ul
            style={{
              paddingLeft: 18,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <li>You must comply with applicable laws</li>
            <li>You must not attempt unauthorised access</li>
            <li>You must not misuse the platform</li>
          </ul>
        </Section>

        <Section title="3. Intellectual Property">
          <p>
            All content on the platform is owned by TAKE YOUR THRONE and is
            protected by intellectual property laws.
          </p>
        </Section>

        <Section title="4. Contact">
          <p>
            Questions about these Terms can be sent to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{
                color: GOLD,
                fontWeight: 700,
                textDecoration: "none",
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

export default TermsPage;