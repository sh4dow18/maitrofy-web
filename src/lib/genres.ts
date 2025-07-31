// Genres Library Requirements
import genresList from "@/db/genres.json";
// Find Genre Name by Genre Id Function
export function FindGenreNameById(id: number) {
  return genresList.find((genre) => genre.id === id)?.name ?? "N/A";
}
// Find All Genres Function
export function FindAllGenres() {
  return genresList;
}
