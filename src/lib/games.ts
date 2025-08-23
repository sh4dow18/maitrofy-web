// Games Library Requirements
import gamesList from "@/db/games.json";
import themesList from "@/db/themes.json";
import genresList from "@/db/genres.json";
import platformsList from "@/db/platforms.json";
import { ErrorResponse, GameResponse, MinimalGameResponse } from "./types";
import { API } from "./admin";
// Find Top 100 Games Function
export async function FindTop100Games(): Promise<MinimalGameResponse[]> {
  return await fetch(`${API}/games`, {
    method: "GET",
  }).then((response) => response.json());
}
// Find Top 30 Games by Name Function
export function FindGameByName(name: string) {
  return gamesList
    .filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
    .slice(0, 30);
}
// Find Games by Slug Function
export async function FindGameBySlug(
  slug: string
): Promise<GameResponse | ErrorResponse> {
  const RESPONSE = await fetch(`${API}/games/${slug}`, {
    method: "GET",
  });
  // Get Data from JSON
  const DATA = await RESPONSE.json();
  // If Response is not 200, return it as Error Response
  if (RESPONSE.ok === false) {
    return DATA as ErrorResponse;
  }
  // If Response is 200, return it as Game Response
  return DATA as GameResponse;
}
// Find Themes from Game with ids list Function
export function FindThemesFromGame(themesIdsList: number[]) {
  return themesList
    .filter((theme) => themesIdsList.includes(theme.id))
    .map((theme) => theme.name)
    .join(", ");
}
// Find Genres from Game with ids list Function
export function FindGenresFromGame(genresIdsList: number[]) {
  return genresList
    .filter((genre) => genresIdsList.includes(genre.id))
    .map((genre) => genre.name)
    .join(", ");
}
// Find Platforms from Game with ids list Function
export function FindPlatformsFromGame(platformsIdsList: number[]) {
  return platformsList
    .filter((platform) => platformsIdsList.includes(platform.id))
    .map((platform) => platform.name)
    .join(", ");
}
// Find Recommendations from Game with ids list Function
export async function FindRecomendationsFromGame(
  slug: string
): Promise<MinimalGameResponse[] | ErrorResponse> {
  const RESPONSE = await fetch(`${API}/games/recommendations/${slug}`, {
    method: "GET",
  });
  // Get Data from JSON
  const DATA = await RESPONSE.json();
  // If Response is not 200, return it as Error Response
  if (RESPONSE.ok === false) {
    return DATA as ErrorResponse;
  }
  // If Response is 200, return it as Minimal Game Response Array
  return DATA as MinimalGameResponse[];
}
// Find Games By Slugs with ids list Function
export function FindGamesBySlugIds(slugsList: string[]) {
  return gamesList.filter((game) => slugsList.includes(game.slug));
}
// Find the Top 100 Games by Filters Function
export async function FindGamesByFilters(
  name: string,
  theme: number,
  genre: number,
  platform: number
): Promise<MinimalGameResponse[]> {
  const SEARCH_URL = new URLSearchParams();
  if (name != "") {
    SEARCH_URL.append("name", name);
  }
  if (theme != 0) {
    SEARCH_URL.append("themeId", `${theme}`);
  }
  if (genre != 0) {
    SEARCH_URL.append("genreId", `${genre}`);
  }
  if (platform != 0) {
    SEARCH_URL.append("platformId", `${platform}`);
  }
  return await fetch(`${API}/games/search?${SEARCH_URL}`, {
    method: "GET",
  }).then((response) => response.json());
}
