// Sitemap Requirements
import type { MetadataRoute } from "next";
// Sitemap Main Function
export default function sitemap(): MetadataRoute.Sitemap {
  // Returns Sitemap XML File
  return [
    {
      url: "https://maitrofy.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}