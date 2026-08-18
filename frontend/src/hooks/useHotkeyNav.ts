import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../data";

const routeMap: Record<string, string> = {
  home: "/",
  teams: "/teams",
  org: "/org",
  news: "/news",
  shop: "/shop",
  partners: "/partners",
};

/** Single-letter page jumps — H/T/N/O/S/P — matching the little monospace
 *  key chips already shown next to each label in the desktop nav (NavBar.tsx)
 *  and mobile menu. Those chips were sitting there as an affordance with
 *  nothing behind them; this is what makes them real. Ignored while a
 *  modifier is held (so Cmd+T for a new browser tab still works) or while
 *  the user is typing into a form field. */
export function useHotkeyNav() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;

      const item = NAV_ITEMS.find((n) => n.key.toUpperCase() === e.key.toUpperCase());
      if (!item) return;

      navigate(routeMap[item.page]);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);
}
