import { useState, useEffect, useCallback } from "react";

export interface FeedPost {
  id: string;
  text: string;
  url: string;
  publishedAt: string;
  image: string | null;
}

type Status = "loading" | "ok" | "error";

const POLL_INTERVAL = 5 * 60 * 1000;
const API_URL = import.meta.env.VITE_PROXY_URL ?? "";

function parseRSS(xml: string): FeedPost[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");

  if (doc.querySelector("parsererror")) {
    console.error("RSS parse error");
    return [];
  }

  const items = Array.from(doc.querySelectorAll("item"));

  return items.map(item => {
    const url = item.querySelector("link")?.textContent?.trim()
      ?? item.querySelector("guid")?.textContent?.trim()
      ?? "";

    const id = url.split("/").pop() ?? Math.random().toString(36).slice(2);

    const rawDesc = item.querySelector("description")?.textContent?.trim() ?? "";
    const descDoc = new DOMParser().parseFromString(rawDesc, "text/html");
    const pTag = descDoc.querySelector("blockquote p");
    const text = pTag
      ? (pTag.textContent?.trim() ?? "")
      : (descDoc.body.textContent?.trim() ?? "");

    const mediaContent = item.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "content")[0];
    const image = mediaContent?.getAttribute("url") ?? null;

    const pubDate = item.querySelector("pubDate")?.textContent?.trim() ?? "";
    const publishedAt = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();

    return { id, text, url, publishedAt, image };
  });
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function useFeed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/feed`);
      if (!res.ok) throw new Error(`${res.status}`);
      const xml = await res.text();
      const parsed = parseRSS(xml);
      setPosts(parsed);
      setFetchedAt(new Date().toISOString());
      setStatus("ok");
    } catch (err) {
      console.error("useFeed error:", err);
      setStatus(prev => (prev === "ok" ? "ok" : "error"));
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(() => load(true), POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [load]);

  return { posts, status, fetchedAt, refresh: () => load(true) };
}