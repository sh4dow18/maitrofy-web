// Games Library Requirements
import gamesList from "@/db/games.json";
import themesList from "@/db/themes.json";
import genresList from "@/db/genres.json";
import platformsList from "@/db/platforms.json";
// Find Top 50 Games Function
export function FindTop100Games() {
  return gamesList.slice(0, 100);
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
export function FindGamesByFilters(
  name: string | null,
  theme: number | null,
  genre: number | null,
  platform: number | null
) {
  // If no filter was submitted, return top 100 games
  if (name === null && theme === null && genre === null && platform === null) {
    return FindTop100Games();
  }
  // Filtered List
  let filteredGamesList = gamesList;
  // If name was submitted, filtered by lowarcase name
  if (name !== null) {
    filteredGamesList = filteredGamesList.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  // If theme was submitted, filtered by theme id number
  if (theme !== null) {
    filteredGamesList = filteredGamesList.filter((game) =>
      game.themes.includes(theme)
    );
  }
  // If genre was submitted, filtered by genre id number
  if (genre !== null) {
    filteredGamesList = filteredGamesList.filter((game) =>
      game.genres.includes(genre)
    );
  }
  // If platform was submitted, filtered by platform id number
  if (platform !== null) {
    filteredGamesList = filteredGamesList.filter((game) =>
      game.platforms.includes(platform)
    );
  }
  // Return Top 100 Games in Filtered Games List
  return filteredGamesList.slice(0, 100);
}
