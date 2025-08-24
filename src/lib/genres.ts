// Genres Library Requirements
import { GenreResponse } from "./types";
import { API } from "./admin";
// Find All Genres Function
export async function FindAllGenres(): Promise<GenreResponse[]> {
  return await fetch(`${API}/genres`, {
    method: "GET",
  }).then((response) => response.json());
}