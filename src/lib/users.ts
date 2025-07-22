// User Library Requirements
import usersList from "@/db/users.json";
import achievementsList from "@/db/achievements.json";
import gamesList from "@/db/games.json";
import { FindGameBySlug, FindGamesBySlugIds } from "./games";
import { FindThemeNameById } from "./themes";
import { FindGenreNameById } from "./genres";
import { FindPlatformNameBySlug } from "./platforms";
import { FindAchievementNameById } from "./achievements";
// Get User Information Function
export function GetUser(email: string) {
  // Find User
  const USER = usersList.find((user) => user.email === email);
  if (USER === undefined) {
    return null;
  }
  // Get User Games List from User
  const GAMES_IDS_LIST = USER.gamesList.map((game) => game.game);
  const GAMES_LIST = FindGamesBySlugIds(GAMES_IDS_LIST);
  // Get Favorite Game
  const FAVORITE_GAME = FindGameBySlug(
    USER.gamesList
      .filter((game) => game.rating !== null)
      .sort((a, b) => b.rating - a.rating)[0].game
  );
  // Function that allows to get the Most Frequent Number in Number List
  const FindMostFrequentNumber = (nums: number[]): number => {
    const COUNTS_LIST: { [key: number]: number } = {};
    let maxNum: number = 0;
    let maxCount = 0;
    for (const num of nums) {
      // If the number already exists in counts list, increment number, if not, set 1
      COUNTS_LIST[num] = (COUNTS_LIST[num] || 0) + 1;
      // If the value is higher than max count, set it as max count
      if (COUNTS_LIST[num] > maxCount) {
        maxCount = COUNTS_LIST[num];
        maxNum = num;
      }
    }
    return maxNum;
  };
  // Function that allows to get the Most Frequent String in String List
  const FindMostFrequentString = (slugs: string[]): string => {
    const COUNTS_LIST: { [key: string]: number } = {};
    let maxSlug: string = "";
    let maxCount = 0;
    for (const slug of slugs) {
      // If the string already exists in counts list, increment number, if not, set 1
      COUNTS_LIST[slug] = (COUNTS_LIST[slug] || 0) + 1;
      // If the value is higher than max count, set it as max count
      if (COUNTS_LIST[slug] > maxCount) {
        maxCount = COUNTS_LIST[slug];
        maxSlug = slug;
      }
    }

    return maxSlug;
  };
  // Function that allows to get the user points
  const GetUserPoints = (email: string) => {
    // Find User
    const USER = usersList.find((user) => user.email === email);
    if (USER === undefined) {
      return "-";
    }
    // Find Achivements from Users Games List
    const ACHIEVEMENTS_IDS_LIST = USER.gamesList.map(
      (game) => game.achievement
    );
    // Returns a Sum of all numbers in Achievemenets List that gets from Achievemenets Ids List
    return ACHIEVEMENTS_IDS_LIST.reduce((sum: number, currentId) => {
      const FOUND = achievementsList.find((item) => item.id === currentId);
      return FOUND ? sum + FOUND.value : sum;
    }, 0);
  };
  // Function that allows to get the user level
  const GetUserLevel = (email: string) => {
    const POINTS = GetUserPoints(email);
    if (POINTS === "-") {
      return "No Encontrado";
    }
    if (POINTS < 5) return "Gamer Novato";
    if (POINTS < 10) return "Jugador Casual";
    if (POINTS < 20) return "Explorador de Juegos";
    if (POINTS < 35) return "Principiante Hardcore";
    if (POINTS < 55) return "Cazador de Logros";
    if (POINTS < 80) return "Jugador Veterano";
    if (POINTS < 110) return "Adicto a los Trofeos";
    if (POINTS < 150) return "Coleccionista";
    if (POINTS < 200) return "Buscador de Platinos";
    if (POINTS < 260) return "Maestro del Juego";
    if (POINTS < 330) return "Cazador Supremo";
    if (POINTS < 410) return "Gamer Legendario";
    if (POINTS < 500) return "Psicogamer";
    if (POINTS < 600) return "El Dios del Platino";
    if (POINTS < 700) return "Asesino Digital";
    if (POINTS < 800) return "Máquina del 100%";
    if (POINTS < 900) return "El Terminator del Juego";
    if (POINTS < 1000) return "Señor de los Trofeos";
    if (POINTS < 1150) return "Psicoplatino Supremo";
    if (POINTS < 1300) return "Más Allá de la Platino";
    if (POINTS < 1500) return "Meta Gamer";
    if (POINTS < 1750) return "Inmortal Virtual";
    if (POINTS < 2000) return "Leyenda Digital";
    return "Gamer Infinito";
  };
  return {
    backgroundImage: FAVORITE_GAME ? FAVORITE_GAME.background : null,
    profileImage: `/${USER.email}.webp`,
    name: USER.name,
    email: USER.email,
    date: USER.createdDate,
    role: USER.rol,
    level: GetUserLevel(email),
    status: USER.status === true ? "Activo" : "Cuenta Cerrada",
    gamesCount: USER.gamesList.length,
    completed: USER.gamesList.filter((game) => game.achievement !== null)
      .length,
    platinum: USER.gamesList.filter((game) => game.achievement === 5).length,
    pseudoPlatinum: USER.gamesList.filter((game) => game.achievement === 4)
      .length,
    offlinePlatinum: USER.gamesList.filter((game) => game.achievement === 2)
      .length,
    psicoPlatinum: USER.gamesList.filter((game) => game.achievement === 3)
      .length,
    points: GetUserPoints(email),
    ranking: "#1",
    favoriteGame: FAVORITE_GAME ? FAVORITE_GAME.name : "N/A",
    favoriteTheme: FindThemeNameById(
      FindMostFrequentNumber(GAMES_LIST.flatMap((game) => game.themes))
    ),
    favoriteGenre: FindGenreNameById(
      FindMostFrequentNumber(GAMES_LIST.flatMap((game) => game.genres))
    ),
    favoritePlatform: FindPlatformNameBySlug(
      FindMostFrequentString(USER.gamesList.map((game) => game.platform))
    ),
    favoriteCollection: FindMostFrequentString(
      GAMES_LIST.filter((game) => game.collection !== null).map(
        (game) => game.collection
      )
    ),
    favoriteDeveloper: FindMostFrequentString(
      GAMES_LIST.map((game) => game.developer)
    ),
    favoriteGameMode: FindMostFrequentString(
      GAMES_LIST.filter(
        (game) => game.gameMode !== undefined && game.gameMode !== null
      ).map((game) => game.gameMode)
    ),
  };
}
// Function that allows to get the user backlog
export function GetUserBacklog(email: string) {
  // Find User
  const USER = usersList.find((user) => user.email === email);
  if (USER === undefined) {
    return [];
  }
  // Get Ordered Games List
  const ORDERED_GAMES_LIST = USER.gamesList.map((item) => item.game);
  // Generate the User Backlog
  const USER_BACKLOG = USER.gamesList
    .map((entry) => {
      // Find Game
      const GAME = gamesList.find((g) => g.slug === entry.game);
      if (GAME === undefined) {
        return null;
      }
      // Get Achievement as Number
      const ACHIEVEMENT = entry.achievement !== null ? entry.achievement : 0;
      // Return Backlog
      return {
        game: {
          slug: GAME.slug,
          cover: GAME.cover,
          name: GAME.name,
        },
        achievement: FindAchievementNameById(ACHIEVEMENT),
        platform: FindPlatformNameBySlug(entry.platform),
        rating: entry.rating,
        date: entry.date,
      };
    })
    // Get all not-null objects
    .filter(Boolean) as {
    game: {
      slug: string;
      cover: string;
      name: string;
    };
    achievement: string;
    platform: string;
    rating: number | null;
    date: string | null;
  }[];
  // Return User Backlog Sorted by Slug
  return USER_BACKLOG.sort(
    (a, b) =>
      ORDERED_GAMES_LIST.indexOf(a!.game.slug) -
      ORDERED_GAMES_LIST.indexOf(b!.game.slug)
  );
}
export function FindUserLog(email: string, slug: string) {
  // Find User
  const USER = usersList.find((user) => user.email === email);
  if (USER === undefined) {
    return null;
  }
  return USER.gamesList.find((user) => user.game === slug);
}
