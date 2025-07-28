// Achievements Library Requirements
import achievementsList from "@/db/achievements.json";
// Find Achievement Name by Achievement Id Function
export function FindAchievementNameById(id: number) {
  return (
    achievementsList.find((achievement) => achievement.id === id)?.name ?? "N/A"
  );
}
// Find Achievement Value by Achievement Id Function
export function FindAchievementValueById(id: number) {
  return (
    achievementsList.find((achievement) => achievement.id === id)?.value ?? 0
  );
}
// Find Achievement by Achievement Id Function
export function FindAchievementById(id: number) {
  return achievementsList.find((achievement) => achievement.id === id);
}
