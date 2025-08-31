// Achievements Library Requirements
import { API } from "./admin";
import { GetJWT } from "./session";
import { AchievementResponse, ErrorResponse } from "./types";
// Find All Achievements
export async function FindAllAchievements(): Promise<
  AchievementResponse[] | ErrorResponse
> {
  const RESPONSE = await fetch(`${API}/achievements`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GetJWT()}`,
    },
  });
  // Get Data from JSON
  const DATA = await RESPONSE.json();
  // If Response is not 200, return it as Error Response
  if (RESPONSE.ok == false) {
    return DATA as ErrorResponse;
  }
  // If Response is 200, return it as Achievement Response array
  return DATA as AchievementResponse[];
}
