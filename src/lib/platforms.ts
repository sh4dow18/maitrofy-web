// Platforms Library Requirements
import { PlatformResponse } from "./types";
import { API } from "./admin";
// Find All Platform Function
export async function FindAllPlatforms(): Promise<PlatformResponse[]> {
  return await fetch(`${API}/platforms`, {
    method: "GET",
  }).then((response) => response.json());
}
// Find All Game Platform Function
export async function FindAllGamePlatforms(
  slug: string
): Promise<PlatformResponse[]> {
  return await fetch(`${API}/platforms/game/${slug}`, {
    method: "GET",
  }).then((response) => response.json());
}
