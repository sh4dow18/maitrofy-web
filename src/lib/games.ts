// Games Library Requirements
import gamesList from "@/db/games.json";
import themesList from "@/db/themes.json";
import genresList from "@/db/genres.json";
import platformsList from "@/db/platforms.json";
// Find Top 50 Games Function
export function FindTop50Games() {
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
// Find Themes from Game with ids list
export function FindThemesFromGame(themesIdsList: number[]) {
  return themesList
    .filter((theme) => themesIdsList.includes(theme.id))
    .map((theme) => theme.name)
    .join(", ");
}
// Find Genres from Game with ids list
export function FindGenresFromGame(genresIdsList: number[]) {
  return genresList
    .filter((genre) => genresIdsList.includes(genre.id))
    .map((genre) => genre.name)
    .join(", ");
}
// Find Platforms from Game with ids list
export function FindPlatformsFromGame(platformsIdsList: number[]) {
  return platformsList
    .filter((platform) => platformsIdsList.includes(platform.id))
    .map((platform) => platform.name)
    .join(", ");
}
