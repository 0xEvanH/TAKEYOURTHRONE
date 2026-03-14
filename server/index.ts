import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
const RSS_URL = process.env.RSS_URL;

app.use("*", cors());

app.get("/health", c => {
  return c.json({
    ok: true,
    rssConfigured: !!RSS_URL,
    rssUrl: RSS_URL ?? "NOT SET",
  });
});

interface FeedErrorResponse {
  error: string;
}

interface HealthResponse {
  ok: boolean;
  rssConfigured: boolean;
  rssUrl: string;
}

app.get("/api/feed", async (c: import("hono").Context): Promise<Response> => {
  if (!RSS_URL) {
    console.error("RSS_URL is not set — check server/.env");
    const errorResponse: FeedErrorResponse = { error: "RSS_URL not set in .env" };
    return c.json(errorResponse, 500);
  }

  try {
    console.log(`Fetching RSS: ${RSS_URL}`);
    const upstream: Response = await fetch(RSS_URL, {
      headers: { "User-Agent": "TYT-Site/1.0" },
    });
    if (!upstream.ok) {
      const body: string = await upstream.text();
      throw new Error(`rss.app ${upstream.status}: ${body.slice(0, 200)}`);
    }
    const xml: string = await upstream.text();
    console.log(`RSS OK — ${xml.length} bytes`);
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err: any) {
    console.error("Feed error:", err.message);
    const errorResponse: FeedErrorResponse = { error: err.message };
    return c.json(errorResponse, 502);
  }
});

const PORT = Number(process.env.PORT) || 3001;

export default {
  port: PORT,
  fetch: app.fetch,
};

console.log(`Proxy running on http://localhost:${PORT}`);
console.log(`RSS_URL: ${RSS_URL ?? "NOT SET — check server/.env"}`);