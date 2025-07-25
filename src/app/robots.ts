// Robots Requirements
import type { MetadataRoute } from "next";
// Robots Main Function
export default function robots(): MetadataRoute.Robots {
  // Returns Robots Text File
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://maitrofy.vercel.app/sitemap.xml",
  };
}