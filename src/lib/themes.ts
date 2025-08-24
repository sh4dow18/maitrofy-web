// Themes Library Requirements
import { API } from "./admin";
import { ThemeResponse } from "./types";
// Find All Themes Function
export async function FindAllThemes(): Promise<ThemeResponse[]> {
  return await fetch(`${API}/themes`, {
    method: "GET",
  }).then((response) => response.json());
}