// Games Library Requirements
import gamesList from "@/db/games.json";
import themesList from "@/db/themes.json";
import genresList from "@/db/genres.json";
import platformsList from "@/db/platforms.json";
import { MinimalGameResponse } from "./types";
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
export function FindGameBySlug(slug: string) {
  return gamesList.find((game) => game.slug === slug);
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
export function FindRecomendationsFromGame(
  slug: string,
  collection: string | null,
  developer: string | null,
  theme: number
) {
  const COLLECTIONS_LIST =
    collection !== null
      ? gamesList.filter(
          (game) => game.collection === collection && game.slug !== slug
        )
      : [];
  const DEVELOPERS_LIST =
    developer !== null
      ? gamesList.filter(
          (game) => game.developer === developer && game.slug !== slug
        )
      : [];
  const THEMES_LIST = gamesList.filter(
    (game) => game.themes[0] === theme && game.slug !== slug
  );
  const COMBINED_LIST = [
    ...COLLECTIONS_LIST,
    ...DEVELOPERS_LIST,
    ...THEMES_LIST,
  ];
  const UNIQUE_GAMES_MAP = new Map<string, (typeof gamesList)[number]>();
  for (const game of COMBINED_LIST) {
    if (!UNIQUE_GAMES_MAP.has(game.slug)) {
      UNIQUE_GAMES_MAP.set(game.slug, game);
    }
  }
  const NEW_LIST = Array.from(UNIQUE_GAMES_MAP.values()).slice(0, 15);
  return NEW_LIST.map((game) => ({
    cover: game.cover,
    slug: game.slug,
  }));
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
