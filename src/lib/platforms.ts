// Platforms Library Requirements
import platformsList from "@/db/platforms.json";
// Find Platform Name by Platforms Id Function
export function FindPlatformNameBySlug(slug: string) {
  return platformsList.find((platform) => platform.slug === slug)?.name ?? "N/A";
}
