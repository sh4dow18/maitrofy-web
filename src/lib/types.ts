export type ThemeResponse = {
  id: number;
  name: string;
};
export type GenreResponse = {
  id: number;
  name: string;
};
export type PlatformResponse = {
  id: number;
  name: string;
};
export type MinimalGameResponse = {
  slug: string;
  name: string;
  cover: string;
};
export type AchievementResponse = {
  id: number;
  name: string;
  points: number;
  logo: string;
};
export type UserResponse = {
  account: {
    id: number;
    name: string | null;
    date: string;
  };
  statistics: {
    gameLogsCount: number;
    achievementsList: {
      achievement: AchievementResponse;
      amount: number;
    }[];
    points: number;
  };
  preferences: {
    game: {
      name: string;
      cover: string | null;
      background: string | null;
    } | null;
    theme: string;
    genre: string;
    platform: string;
    collection: string;
    developer: string;
    gameMode: string;
  };
};
export type ErrorResponse = {
  status: string;
  message: string;
};
export type GameResponse = {
  slug: string;
  name: string;
  summary: string;
  cover: string;
  background: string;
  rating: number;
  classification: string | null;
  year: number;
  video: string;
  collection: string | null;
  developer: string;
  gameMode: string;
  themes: string;
  genres: string;
  platforms: string;
};
export type MinimalGameLogResponse = {
  slug: string;
  rating: number | null;
  date: string;
  game: MinimalGameResponse;
  platform: string;
  achievement: AchievementResponse | null;
};
export type GameLogResponse = {
  slug: string,
  rating: number | null,
  date: string,
  review: string | null,
  hoursSpend: number | null,
  game: GameResponse,
  platform: string | null,
  achievement: AchievementResponse | null
}
