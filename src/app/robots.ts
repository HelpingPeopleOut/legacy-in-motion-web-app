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

const AI_ALLOW_PATHS = [
  "/",
  "/llms.txt",
  "/llms-es.txt",
  "/llms-full.txt",
  "/humans.txt",
  "/ai-plugin.json",
  "/enterprise-profile.json",
  "/locations/",
  "/es/locations/",
  "/links",
  "/es/links",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/dashboard/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: AI_ALLOW_PATHS,
        disallow,
      })),
    ],
    sitemap: buildSiteUrl("/sitemap.xml"),
    host: BUSINESS.url.replace(/^https?:\/\//, ""),
  };
}
