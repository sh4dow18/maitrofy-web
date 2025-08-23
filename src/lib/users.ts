// User Library Requirements
import usersList from "@/db/users.json";
import gamesList from "@/db/games.json";
import { FindPlatformNameBySlug } from "./platforms";
import { FindAchievementById } from "./achievements";
import { API } from "./admin";
import { GetJWT } from "./session";
import { ErrorResponse, UserResponse } from "./types";
// Get User Information Function
export async function FindProfileWithUser(): Promise<UserResponse | ErrorResponse> {
  const RESPONSE = await fetch(`${API}/users/profile`, {
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
  // If Response is 200, return it as User Response
  return DATA as UserResponse;
}
// Function that allows to get the user backlog
export function GetUserBacklog(email: string) {
  // Find User
  const USER = usersList.find((user) => user.email === email);
  if (USER === undefined) {
    return [];
  }
  // Get Ordered Games List
  const ORDERED_GAMES_LIST = USER.gamesList.map((item) => item.game);
  // Generate the User Backlog
  const USER_BACKLOG = USER.gamesList
    .map((entry) => {
      // Find Game
      const GAME = gamesList.find((g) => g.slug === entry.game);
      if (GAME === undefined) {
        return null;
      }
      // Get Achievement as Number
      const ACHIEVEMENT_ID = entry.achievement !== null ? entry.achievement : 0;
      const ACHIEVEMENT = FindAchievementById(ACHIEVEMENT_ID);
      // Return Backlog
      return {
        game: {
          slug: GAME.slug,
          cover: GAME.cover,
          name: GAME.name,
        },
        achievement: {
          name: typeof ACHIEVEMENT === "object" ? ACHIEVEMENT.name : "Jugando",
          logo: typeof ACHIEVEMENT === "object" ? ACHIEVEMENT.logo : "playing",
        },
        platform: FindPlatformNameBySlug(entry.platform),
        rating: entry.rating,
        date: entry.date,
      };
    })
    // Get all not-null objects
    .filter(Boolean) as {
    game: {
      slug: string;
      cover: string;
      name: string;
    };
    achievement: {
      name: string;
      logo: string | null;
    };
    platform: string;
    rating: number | null;
    date: string | null;
  }[];
  // Return User Backlog Sorted by Slug
  return USER_BACKLOG.sort(
    (a, b) =>
      ORDERED_GAMES_LIST.indexOf(a!.game.slug) -
      ORDERED_GAMES_LIST.indexOf(b!.game.slug)
  );
}
export function FindUserLog(email: string, slug: string) {
  // Find User
  const USER = usersList.find((user) => user.email === email);
  if (USER === undefined) {
    return null;
  }
  return USER.gamesList.find((user) => user.game === slug);
}
