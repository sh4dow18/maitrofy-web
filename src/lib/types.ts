export type User = {
  backgroundImage: string | null;
  profileImage: string | null;
  name: string;
  email: string;
  date: string;
  role: string;
  level: string;
  status: string;
  gamesCount: string | number;
  completed: string | number;
  platinum: string | number;
  pseudoPlatinum: string | number;
  offlinePlatinum: string | number;
  psicoPlatinum: string | number;
  points: string | number;
  ranking: string;
  favoriteGame: string;
  favoriteTheme: string;
  favoriteGenre: string;
  favoritePlatform: string;
  favoriteCollection: string;
  favoriteDeveloper: string;
  favoriteGameMode: string;
};
export type GameLog = {
  game: {
    slug: string;
    cover: string | null;
    name: string;
  };
  achievement: {
    name: string;
    logo: string | null;
  };
  platform: string;
  rating: number | null;
  date: string | null;
};
export type Game = {
  name: string;
  summary: string;
  cover: string | null;
  background: string | null;
  rating: number;
  classification: string | null;
  year: string;
  slug: string;
  video: string | null;
  genres: number[];
  platforms: number[];
  themes: number[];
  collection: string | null;
  developer: string;
  gameMode?: string | null;
};

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
