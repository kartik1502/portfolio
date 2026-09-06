import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://kartik1502.github.io/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${siteUrl}/writing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${siteUrl}/changelog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${siteUrl}/repos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.7 },
  ];

  return routes;
}
