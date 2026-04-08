import { useEffect } from "react";

/**
 * OCE5N Esports — SEO Component
 * Drop-in <SEO /> on every page/route to control meta tags dynamically.
 * No external dependency required — pure DOM manipulation.
 *
 * Usage:
 *   <SEO
 *     title="OCE5N Esports | Home"
 *     description="Multi-Media Gaming Team based in Columbus, Ohio. Since 2022."
 *     path="/"
 *   />
 */

const SITE = {
  name: "Take Your Throne Esports",
  url: "https://takeyourthrone.com",
  twitter: "@TYT_Esport",
  logo: "https://takeyourthrone.com/tytogg.png",
  themeColor: "#0ff",
  locale: "en_US",
};

const DEFAULT_SEO = {
  title: "Take Your Throne Esports",
  description:
    "TYT is a multi-media esports & gaming team based in Columbus, Ohio. Competing, creating, and building community since 2022. Powered by SocialSight, Hypertune & Sonix.",
  keywords:
    "Take Your Throne, TYT Esports, gaming team, esports, Fortnite, FNCS, tournament, Siege, R6, Rainbow Six Siege, competitive gaming, multi-media gaming",
  image: "https://takeyourthrone.com/tytogg.png",
  type: "website",
};

function setMeta(attr, value, content) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_SEO.image,
  type = DEFAULT_SEO.type,
  path = "/",
  noIndex = false,
  article = null,
}) {
  const canonicalUrl = `${SITE.url}${path}`;

  useEffect(() => {
    document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setMeta("name", "theme-color", SITE.themeColor);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("name", "author", SITE.name);

    setLink("canonical", canonicalUrl);

    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:type", type);
    setMeta("property", "og:locale", SITE.locale);

    if (article) {
      setMeta("property", "article:published_time", article.publishedTime ?? "");
      setMeta("property", "article:modified_time", article.modifiedTime ?? "");
      setMeta("property", "article:author", article.author ?? SITE.name);
      setMeta("property", "article:section", article.section ?? "Esports");
      (article.tags ?? []).forEach((tag) => {
        const el = document.createElement("meta");
        el.setAttribute("property", "article:tag");
        el.setAttribute("content", tag);
        document.head.appendChild(el);
      });
    }

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", SITE.twitter);
    setMeta("name", "twitter:creator", SITE.twitter);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    let ldScript = document.getElementById("ld-json-oce5n");
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.id = "ld-json-oce5n";
      ldScript.type = "application/ld+json";
      document.head.appendChild(ldScript);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://takeyourthrone.com/#organization",
          name: "Take Your Throne Esports",
          alternateName: ["TYT", "Take your throne", "TYT Esports"],
          url: "https://takeyourthrone.com",
          logo: { "@type": "ImageObject", url: "https://takeyourthrone.com/tytogg.png" },
          description:
            "Multi-Media Gaming Team. Competing and creating since 2025.",
          foundingDate: "2025",
          location: { "@type": "Place", name: "USA" },
          sameAs: ["https://twitter.com/TYT_Esport", "https://takeyourthrone.com"],
        },
        {
          "@type": "WebSite",
          "@id": "https://takeyourthrone.com/#website",
          url: "https://takeyourthrone.com",
          name: "Take Your Throne Esports",
          publisher: { "@id": "https://takeyourthrone.com/#organization" },
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          isPartOf: { "@id": "https://takeyourthrone.com/#website" },
          about: { "@id": "https://takeyourthrone.com/#organization" },
        },
      ],
    };

    ldScript.textContent = JSON.stringify(structuredData, null, 2);
  }, [title, description, keywords, image, type, path, noIndex, article, canonicalUrl]);

  return null;
}