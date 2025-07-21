// Achievements Library Requirements
import achievementsList from "@/db/achievements.json";
// Find Achievement Name by Achievement Id Function
export function FindAchievementNameById(id: number) {
  return (
    achievementsList.find((achievement) => achievement.id === id)?.name ?? "N/A"
  );
}
