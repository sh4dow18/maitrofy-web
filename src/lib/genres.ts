// Genres Library Requirements
import genresList from "@/db/genres.json";
import { GenreResponse } from "./types";
import { API } from "./admin";
// Find Genre Name by Genre Id Function
export function FindGenreNameById(id: number) {
  return genresList.find((genre) => genre.id === id)?.name ?? "N/A";
}
// Find All Genres Function
export async function FindAllGenres(): Promise<GenreResponse[]> {
  return await fetch(`${API}/genres`, {
    method: "GET",
  }).then((response) => response.json());
}