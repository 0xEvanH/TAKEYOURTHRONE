import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, GOLD_A } from "../constants";
import { NAV_ITEMS } from "../data";
import { LogoMark } from "./UI";

const routeMap: Record<string, string> = {
  home: "/",
  teams: "/teams",
  org: "/org",
  news: "/news",
  shop: "/shop",
  partners: "/partners",
};

const pageFromPath = (path: string) => {
  const entry = Object.entries(routeMap).find(([, route]) => route === path);
  return entry ? entry[0] : "home";
};

interface NavBarProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  isMobile: boolean;
}

export function NavBar({ menuOpen, setMenuOpen, isMobile }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = pageFromPath(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (page: string) => navigate(routeMap[page]);
  const active = scrolled || menuOpen;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: active ? "rgba(8,8,8,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        backdropFilter: active ? "blur(16px)" : "none",
        transition: "all 0.3s",
      }}
    >
      <button
        onClick={() => go("home")}
        style={{ display: "flex", alignItems: "center", gap: 10, background: "transparent", border: 0, cursor: "pointer", flexShrink: 0 }}
      >
        <LogoMark />
        <div style={{ lineHeight: 1 }}>
          <div className="fd" style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "0.1em" }}>TAKE YOUR THRONE</div>
        </div>
      </button>

      {!isMobile && (
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_ITEMS.map(({ key, label, page }) => {
            const isActive = currentPage === page;
            return (
              <button
                key={key}
                onClick={() => go(page)}
                className="fb"
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "6px 12px", background: "transparent", border: 0,
                  cursor: "pointer", textTransform: "uppercase", position: "relative",
                  fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em",
                  color: isActive ? GOLD : "rgba(255,255,255,0.55)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}
              >
                <span
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 18, height: 18, fontSize: 8.5, fontFamily: "monospace",
                    border: `1px solid ${isActive ? GOLD_A(0.6) : "rgba(255,255,255,0.18)"}`,
                    color: isActive ? GOLD : "rgba(255,255,255,0.3)",
                    borderRadius: 3, flexShrink: 0,
                  }}
                >
                  {key}
                </span>
                {label}
                {isActive && (
                  <span style={{ position: "absolute", bottom: -1, left: 12, right: 12, height: 1, background: GOLD }} />
                )}
              </button>
            );
          })}
        </nav>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        {!isMobile && (
          <button className="btn-gold" onClick={() => go("shop")} style={{ padding: "8px 18px", fontSize: 10 }}>
            SHOP NOW
          </button>
        )}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "transparent", border: 0, cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              style={{ display: "block", width: 22, height: 1.5, background: "#fff", transformOrigin: "center" }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ display: "block", width: 22, height: 1.5, background: "#fff" }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              style={{ display: "block", width: 22, height: 1.5, background: "#fff", transformOrigin: "center" }} />
          </button>
        )}
      </div>
    </header>
  );
}

interface MobileMenuProps {
  open: boolean;
  setMenuOpen: (v: boolean) => void;
}

export function MobileMenu({ open, setMenuOpen }: MobileMenuProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage = pageFromPath(pathname);

  const go = (page: string) => {
    navigate(routeMap[page]);
    setMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "#070707", display: "flex", flexDirection: "column",
            overflowY: "auto", paddingTop: 80, paddingBottom: 40,
          }}
        >
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, padding: "0 32px" }}>
            {NAV_ITEMS.map(({ key, label, page }, i) => {
              const isActive = currentPage === page;
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  onClick={() => go(page)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "18px 0", background: "transparent", cursor: "pointer",
                    textAlign: "left", border: 0, borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 26, height: 26, fontSize: 10, fontFamily: "monospace",
                    border: `1px solid ${isActive ? GOLD : "rgba(255,255,255,0.15)"}`,
                    color: isActive ? GOLD : "rgba(255,255,255,0.3)",
                    borderRadius: 2, flexShrink: 0,
                  }}>
                    {key}
                  </span>
                  <span className="fd" style={{ fontSize: 36, fontWeight: 700, letterSpacing: "0.05em", color: isActive ? GOLD : "rgba(255,255,255,0.85)" }}>
                    {label}
                  </span>
                </motion.button>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{ padding: "0 32px" }}
          >
            <button
              className="btn-gold"
              style={{ width: "100%", padding: "16px 28px", fontSize: 11 }}
              onClick={() => go("shop")}
            >
              VISIT SHOP →
            </button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20 }}>
              <span className="pdot" style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, display: "block" }} />
              <span className="fb" style={{ color: GOLD, fontSize: 9.5, letterSpacing: "0.22em" }}>SYSTEMS OPERATIONAL</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}