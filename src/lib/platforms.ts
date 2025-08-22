// Platforms Library Requirements
import platformsList from "@/db/platforms.json";
import { PlatformResponse } from "./types";
import { API } from "./admin";
// Find Platform Name by Platforms Id Function
export function FindPlatformNameBySlug(slug: string) {
  return (
    platformsList.find((platform) => platform.slug === slug)?.name ?? "N/A"
  );
}
// Find All Platform Function
export async function FindAllPlatforms(): Promise<PlatformResponse[]> {
  return await fetch(`${API}/platforms`, {
    method: "GET",
  }).then((response) => response.json());
}