import { PageHero } from "./UI";
import { LegalSection, LAST_UPDATED, CONTACT_EMAIL } from "./LegalSection";
import { Footer } from "./Footer";
import useSEO from "../hooks/useSEO";

const PrivacyPage = () => {
  useSEO({
    title: "Privacy Policy",
    description:
      "TAKE YOUR THRONE privacy policy - how we collect, use and protect your data.",
    url: "/privacy",
  });

  return (
    <div style={{ background: "#0c0c0c" }}>
      <PageHero label="Legal" title="PRIVACY" titleAccent="Policy" sub={`Last updated: ${LAST_UPDATED}`} />

      <section style={{ padding: "104px 80px", maxWidth: 960, margin: "0 auto" }}>
        <LegalSection title="1. Introduction" index={0}>
          <p>
            TAKE YOUR THRONE ("we", "us", or "our") operates this website. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our platform.
          </p>
        </LegalSection>

        <LegalSection title="2. Information We Collect" index={1}>
          <p>
            We may collect personal data such as your name, email address, and
            usage information including IP address, browser type, pages visited,
            and time spent on the site.
          </p>
        </LegalSection>

        <LegalSection title="3. How We Use Your Information" index={2}>
          <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            <li>Operate and maintain the platform</li>
            <li>Respond to enquiries</li>
            <li>Improve performance and user experience</li>
            <li>Ensure platform security</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Contact Us" index={3}>
          <p>
            Questions about this Privacy Policy can be sent to{" "}
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

export default PrivacyPage;
