import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/properties";
import { SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/properties`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/buy`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/rent`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/sell`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/featured`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${base}/properties/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
