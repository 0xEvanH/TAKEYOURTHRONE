import { GOLD } from "../constants";
import type { PageName } from "../data";
import { LogoMark } from "./UI";
import { SiX } from "react-icons/si";

interface FooterProps {
  setPage?: (p: PageName) => void;
}

const navCols: { title: string; items: [string, PageName | null][] }[] = [
  { title: "NAVIGATE", items: [["Home", "home"], ["Teams", "teams"], ["News", "news"], ["Shop", "shop"], ["Partners", "partners"]] },
  { title: "FOLLOW", items: [["X / @tyt_esport", null], ]},
  { title: "CONTACT", items: [["TYTgaming2025@gmail.com", null]]},
];

const socials = [
  { icon: SiX, url: "https://x.com/tyt_esport" },
];

export function Footer({ setPage }: FooterProps) {
  return (
    <footer style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "64px 80px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 48, flexWrap: "wrap", marginBottom: 48 }}>
        <div style={{ maxWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <LogoMark />
            <div className="fd" style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "0.1em" }}>TAKE YOUR THRONE</div>
          </div>
          <p className="fb" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.7 }}>
            Professional esports organisation. <br/> Putting the Crown on eSports since 2025. <br/> "HONORA VINCENTIUM"
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {socials.map(({ icon: Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 32,
                  height: 32,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD;
                  (e.currentTarget as HTMLAnchorElement).style.color = GOLD;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
          {navCols.map(col => (
            <div key={col.title}>
              <div className="fb" style={{ color: GOLD, fontWeight: 700, textTransform: "uppercase", fontSize: 8.5, letterSpacing: "0.38em", marginBottom: 14 }}>
                {col.title}
              </div>
              <ul style={{ listStyle: "none" }}>
                {col.items.map(([label, page]) => (
                  <li key={label} style={{ marginBottom: 7 }}>
                    {page && setPage ? (
                      <button
                        onClick={() => setPage(page)}
                        className="fb"
                        style={{ color: "rgba(255,255,255,0.3)", background: "transparent", border: 0, cursor: "pointer", padding: 0, fontSize: 11.5, transition: "color 0.2s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)"; }}
                      >
                        {label}
                      </button>
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
      </div>
    </footer>
  );
}
