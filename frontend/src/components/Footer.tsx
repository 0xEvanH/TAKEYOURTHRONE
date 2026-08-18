import { GOLD, GOLD_A, DISCORD_URL } from "../constants";
import { LogoMark } from "./UI";
import { SiX, SiDiscord } from "react-icons/si";
import { Link } from "react-router-dom";

const navCols: { title: string; items: [string, string | null][] }[] = [
  { title: "NAVIGATE", items: [["Home", "/"], ["Teams", "/teams"], ["News", "/news"], ["Shop", "/shop"], ["Partners", "/partners"]] },
  { title: "FOLLOW", items: [["X / @tyt_esport", "https://x.com/tyt_esport"], ["Discord", DISCORD_URL]] },
  { title: "CONTACT", items: [["TYTgaming2025@gmail.com", "mailto:TYTgaming2025@gmail.com"], ["Get in touch", "/contact"]] },
  { title: "LEGAL", items: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]] },
];

const socials = [
  { icon: SiX, url: "https://x.com/tyt_esport" },
  { icon: SiDiscord, url: DISCORD_URL },
];

// External hrefs render as plain <a>; react-router's <Link> intercepts
// clicks and tries to resolve them as in-app routes, which silently breaks
// for an absolute https:// href.
const isExternal = (path: string) => /^https?:|^mailto:/.test(path);

export function Footer() {
  return (
    <footer style={{ position: "relative", background: "#060606", padding: "64px 80px 32px", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD_A(0.4)} 50%, transparent)` }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", gap: 48, flexWrap: "wrap", marginBottom: 48 }}>
        <div style={{ maxWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <LogoMark />
            <div className="fd" style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "0.1em" }}>TAKE YOUR THRONE</div>
          </div>
          <p className="fb" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.7 }}>
            Professional Esports organisation. <br /> Putting the Crown on Esports since 2025. <br /> "HONORA VINCENTIUM"
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {socials.map(({ icon: Icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="social-btn" style={{ cursor: "pointer" }}>
                <Icon />
              </a>
            ))}
          </div>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost fb"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, padding: "9px 18px", fontSize: 9.5 }}
          >
            <SiDiscord size={13} />
            JOIN DISCORD
          </a>
        </div>

        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          {navCols.map(col => (
            <div key={col.title}>
              <div className="fb" style={{ color: GOLD, fontWeight: 700, textTransform: "uppercase", fontSize: 8.5, letterSpacing: "0.38em", marginBottom: 14 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none" }}>
                {col.items.map(([label, path]) => (
                  <li key={label} style={{ marginBottom: 7 }}>
                    {path ? (
                      isExternal(path) ? (
                        <a
                          href={path}
                          target={path.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="fb footer-link"
                          style={{ fontSize: 11.5, textDecoration: "none" }}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link to={path} className="fb footer-link" style={{ fontSize: 11.5, textDecoration: "none" }}>
                          {label}
                        </Link>
                      )
                    ) : (
                      <span className="fb" style={{ color: "rgba(255,255,255,0.3)", fontSize: 11.5 }}>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap", gap: 10 }}>
        <span className="fb" style={{ color: "rgba(255,255,255,0.2)", fontSize: 9.5 }}>© 2026 TAKE YOUR THRONE. ALL RIGHTS RESERVED.</span>
        <a
          href="https://x.com/synclairdesign"
          target="_blank"
          rel="noopener noreferrer"
          className="fb footer-link"
          style={{ fontSize: 9.5, textDecoration: "none" }}
        >
          Created by @synclairdesign
        </a>
      </div>
    </footer>
  );
}
