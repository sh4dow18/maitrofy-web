// Themes Library Requirements
import themesList from "@/db/themes.json";
// Find Themes Name by Themes Id Function
export function FindThemeNameById(id: number) {
  return themesList.find((theme) => theme.id === id)?.name ?? "N/A";
}
// Find All Themes Function
export function FindAllThemes() {
  return themesList;
}
