// Themes Library Requirements
import themesList from "@/db/themes.json";
import { API } from "./admin";
import { ThemeResponse } from "./types";
// Find Themes Name by Themes Id Function
export function FindThemeNameById(id: number) {
  return themesList.find((theme) => theme.id === id)?.name ?? "N/A";
}
// Find All Themes Function
export async function FindAllThemes(): Promise<ThemeResponse[]> {
  return await fetch(`${API}/themes`, {
    method: "GET",
  }).then((response) => response.json());
}