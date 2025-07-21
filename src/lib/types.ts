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
}