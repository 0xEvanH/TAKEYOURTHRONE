import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GOLD } from "../constants";
import { SHOP_PRODUCTS, type Product } from "../data";
import { PageHero } from "./UI";
import { Footer } from "./Footer";
import useSEO from "../hooks/useSEO";

const categories = ["ALL", "JERSEYS", "APPAREL", "ACCESSORIES"];

export function ShopPage() {
  useSEO({
    title: "Shop",
    description:
      "TAKE YOUR THRONE shop - official merchandise for our competitive teams.",
    url: "/shop",
  });

  const [filter, setFilter] = useState("ALL");
  const gridRef = useRef<HTMLDivElement>(null);
  const gridVisible = useInView(gridRef, { once: true });

  const products =
    filter === "ALL"
      ? SHOP_PRODUCTS
      : SHOP_PRODUCTS.filter((p) => p.category === filter);

  const openProduct = (p: Product) => {
    window.open(p.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      <PageHero
        label="Official Store"
        title="LATEST"
        titleAccent="ARRIVALS"
        sub="Official TAKE YOUR THRONE merchandise. Ships worldwide."
      />

      {/* Filter bar */}
      <div
        style={{
          background: "#111",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          minHeight: 52,
          padding: "0 80px",
        }}
      >
        <span
          className="fb"
          style={{
            color: "rgba(255,255,255,0.3)",
            fontWeight: 700,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            marginRight: 24,
            fontSize: 9.5,
            letterSpacing: "0.3em",
          }}
        >
          FILTER:
        </span>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className="fb"
            style={{
              background: "transparent",
              border: 0,
              cursor: "pointer",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              padding: "14px 18px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: filter === c ? "#fff" : "rgba(255,255,255,0.38)",
              borderBottom:
                filter === c ? `2px solid ${GOLD}` : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {c} {filter === c ? "▸" : ""}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            ref={gridRef}
            style={{ background: "#0d0d0d", padding: "56px 80px 96px" }}
          >
            <div
              className="fb"
              style={{
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                marginBottom: 32,
                fontSize: 9.5,
                letterSpacing: "0.25em",
              }}
            >
              {products.length} PRODUCT{products.length !== 1 ? "S" : ""}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: "40px 24px",
              }}
            >
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={gridVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="shop-card"
                >
                  {/* Image area — click anywhere to open product */}
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      background: "#181818",
                      aspectRatio: "3/4",
                      cursor: "pointer",
                    }}
                    onClick={() => openProduct(p)}
                    onMouseEnter={(e) => {
                      const btn = (e.currentTarget as HTMLDivElement).querySelector(
                        "button"
                      ) as HTMLButtonElement | null;
                      const overlay = (
                        e.currentTarget as HTMLDivElement
                      ).querySelector(".overlay") as HTMLDivElement | null;
                      if (btn) {
                        btn.style.opacity = "1";
                        btn.style.transform = "translateY(0)";
                      }
                      if (overlay)
                        overlay.style.background = "rgba(0,0,0,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      const btn = (e.currentTarget as HTMLDivElement).querySelector(
                        "button"
                      ) as HTMLButtonElement | null;
                      const overlay = (
                        e.currentTarget as HTMLDivElement
                      ).querySelector(".overlay") as HTMLDivElement | null;
                      if (btn) {
                        btn.style.opacity = "0";
                        btn.style.transform = "translateY(8px)";
                      }
                      if (overlay) overlay.style.background = "rgba(0,0,0,0)";
                    }}
                  >
                    <img className="shop-card-img" src={p.img} alt={p.name} />

                    <div
                      className="overlay"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        padding: 20,
                        background: "rgba(0,0,0,0)",
                        transition: "background 0.3s",
                      }}
                    >
                      <button
                        className="btn-gold"
                        style={{
                          width: "100%",
                          padding: "11px 16px",
                          fontSize: 9.5,
                          opacity: 0,
                          transform: "translateY(8px)",
                          transition: "opacity 0.25s, transform 0.25s",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // avoid double-firing from parent div
                          openProduct(p);
                        }}
                      >
                        VIEW PRODUCT ↗
                      </button>
                    </div>

                    {p.badge && (
                      <span
                        className="fb"
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "4px 8px",
                          fontSize: 8,
                          letterSpacing: "0.22em",
                          background:
                            p.badge === "LIMITED"
                              ? "transparent"
                              : p.badge === "BESTSELLER"
                              ? "rgba(0,0,0,0.75)"
                              : GOLD,
                          border:
                            p.badge === "LIMITED"
                              ? `1px solid ${GOLD}`
                              : undefined,
                          color:
                            p.badge === "LIMITED"
                              ? GOLD
                              : p.badge === "BESTSELLER"
                              ? GOLD
                              : "#000",
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Product info */}
                  <div
                    style={{
                      paddingTop: 16,
                      paddingLeft: 4,
                      paddingRight: 4,
                      paddingBottom: 4,
                    }}
                  >
                    <div
                      className="fb"
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        marginBottom: 6,
                        fontSize: 9,
                        letterSpacing: "0.28em",
                      }}
                    >
                      {p.category}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 8,
                        cursor: "pointer",
                      }}
                      onClick={() => openProduct(p)}
                    >
                      <h3
                        className="fd"
                        style={{
                          color: "#fff",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: 18,
                          lineHeight: 1.2,
                        }}
                      >
                        {p.name}
                      </h3>
                      <span
                        className="fd"
                        style={{
                          color: GOLD,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          fontSize: 20,
                        }}
                      >
                        {p.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}