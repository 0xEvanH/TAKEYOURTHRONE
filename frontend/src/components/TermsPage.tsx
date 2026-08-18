import { PageHero } from "./UI";
import { LegalSection, LAST_UPDATED, CONTACT_EMAIL } from "./LegalSection";
import { Footer } from "./Footer";
import useSEO from "../hooks/useSEO";

const TermsPage = () => {
  useSEO({
    title: "Terms of Service",
    description:
      "TAKE YOUR THRONE terms of service - rules governing use of the platform.",
    url: "/terms",
  });

  return (
    <div style={{ background: "#0c0c0c" }}>
      <PageHero label="Legal" title="TERMS" titleAccent="of Service" sub={`Last updated: ${LAST_UPDATED}`} />

      <section style={{ padding: "104px 80px", maxWidth: 960, margin: "0 auto" }}>
        <LegalSection title="1. Acceptance of Terms" index={0}>
          <p>
            By accessing and using the TAKE YOUR THRONE platform, you agree to
            be bound by these Terms of Service.
          </p>
        </LegalSection>

        <LegalSection title="2. Use of the Platform" index={1}>
          <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            <li>You must comply with applicable laws</li>
            <li>You must not attempt unauthorised access</li>
            <li>You must not misuse the platform</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Intellectual Property" index={2}>
          <p>
            All content on the platform is owned by TAKE YOUR THRONE and is
            protected by intellectual property laws.
          </p>
        </LegalSection>

        <LegalSection title="4. Contact" index={3}>
          <p>
            Questions about these Terms can be sent to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="legal-link">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </LegalSection>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;
