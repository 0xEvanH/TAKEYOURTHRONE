import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

const app = new Hono();
const RSS_URL = process.env.RSS_URL;

app.use("/api/*", cors());

app.get("/health", c => {
  return c.json({
    ok: true,
    rssConfigured: !!RSS_URL,
    rssUrl: RSS_URL ?? "NOT SET",
  });
});

app.get("/api/feed", async c => {
  if (!RSS_URL) {
    console.error("RSS_URL is not set");
    return c.json({ error: "RSS_URL not set" }, 500);
  }

  try {
    const upstream = await fetch(RSS_URL, {
      headers: { "User-Agent": "TYT-Site/1.0" },
    });
    if (!upstream.ok) {
      const body = await upstream.text();
      throw new Error(`rss.app ${upstream.status}: ${body.slice(0, 200)}`);
    }
    const xml = await upstream.text();
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err: any) {
    console.error("Feed error:", err.message);
    return c.json({ error: err.message }, 502);
  }
});

app.use("*", serveStatic({ root: "./dist" }));

app.get("*", serveStatic({ path: "./dist/index.html" }));

const PORT = Number(process.env.PORT) || 3001;

export default {
  port: PORT,
  fetch: app.fetch,
};

console.log(`Server running on http://localhost:${PORT}`);
console.log(`RSS_URL: ${RSS_URL ?? "NOT SET"}`);