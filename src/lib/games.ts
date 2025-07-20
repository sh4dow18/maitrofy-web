// Games Library Requirements
import gamesList from "@/db/games.json";
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
