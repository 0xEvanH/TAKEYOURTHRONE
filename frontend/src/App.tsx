import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GLOBAL_CSS } from "./constants";
import { NavBar, MobileMenu } from "./components/NavBar";
import { HomePage } from "./components/HomePage";
import { TeamsPage } from "./components/TeamsPage";
import { OrgPage } from "./components/OrgPage";
import { NewsPage } from "./components/NewsPage";
import { ShopPage } from "./components/ShopPage";
import { PartnersPage } from "./components/PartnersPage";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import { NotFoundPage } from "./components/NotFoundPage";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/org" element={<OrgPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/privacy"  element={<PrivacyPage />}  />
            <Route path="/terms"    element={<TermsPage />}    />
            <Route path="*"         element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </>
  );
}