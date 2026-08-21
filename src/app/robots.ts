import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { buildSiteUrl } from "@/lib/seo-metadata";

export const dynamic = "force-static";

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "anthropic-ai",
  "ClaudeBot",
  "PerplexityBot",
  "Applebot-Extended",
  "cohere-ai",
  "Bytespider",
  "CCBot",
];

const PRIVATE_DISALLOW = [
  "/api/",
  "/dashboard/",
  "/login",
  "/sign-up",
  "/thanks",
  "/es/gracias",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_DISALLOW,
      })),
    ],
    sitemap: buildSiteUrl("/sitemap.xml"),
    host: BUSINESS.url.replace(/^https?:\/\//, ""),
  };
}
