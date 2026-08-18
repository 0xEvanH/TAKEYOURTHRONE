import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GLOBAL_CSS, EASE_SIGNATURE } from "./constants";
import { NavBar, MobileMenu } from "./components/NavBar";
import { HomePage } from "./components/HomePage";
import { TeamsPage } from "./components/TeamsPage";
import { OrgPage } from "./components/OrgPage";
import { NewsPage } from "./components/NewsPage";
import { ShopPage } from "./components/ShopPage";
import { PartnersPage } from "./components/PartnersPage";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import { ContactPage } from "./components/ContactPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { IntroGate } from "./components/IntroGate";
import { ButtonBurst } from "./components/ButtonBurst";
import { ContactFAB } from "./components/ContactFAB";
import { HotkeyHint } from "./components/HotkeyHint";
import { useHotkeyNav } from "./hooks/useHotkeyNav";

const INTRO_SEEN_KEY = "tyt-intro-seen";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showHotkeyHint, setShowHotkeyHint] = useState(false);
  const location = useLocation();
  useHotkeyNav();

  // Fires once, as the freshly-loaded-in page settles — this is the
  // "load in screen" the hint is meant to live on, not a delayed toast
  // bolted on afterward.
  useEffect(() => {
    const t = setTimeout(() => setShowHotkeyHint(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div style={{ background: "#090909", minHeight: "100vh" }}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} isMobile={isMobile} />
      <MobileMenu open={menuOpen} setMenuOpen={setMenuOpen} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASE_SIGNATURE }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/org" element={<OrgPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/contact"  element={<ContactPage />}  />
            <Route path="/privacy"  element={<PrivacyPage />}  />
            <Route path="/terms"    element={<TermsPage />}    />
            <Route path="*"         element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <ContactFAB />
      <HotkeyHint show={showHotkeyHint} />
    </div>
  );
}

export default function App() {
  // The real page isn't mounted until the intro gate resolves — this is
  // what makes "everything animates in" true rather than aspirational:
  // Hero/PageHero's own mount-triggered entrance transitions previously
  // played out in full *behind* the opaque overlay, so by the time it lifted
  // the page was already sitting in its final, static state.
  const [introDone, setIntroDone] = useState(
    () => typeof window !== "undefined" && !!sessionStorage.getItem(INTRO_SEEN_KEY)
  );
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <ButtonBurst />
      <BrowserRouter>
        <ScrollToTop />
        <IntroGate onDone={handleIntroDone} />
        {introDone && <Layout />}
      </BrowserRouter>
    </>
  );
}
