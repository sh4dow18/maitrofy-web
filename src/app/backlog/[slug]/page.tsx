"use client";
import { GameOverview, NotFound } from "@/components";
import { FindAchievementById } from "@/lib/achievements";
import {
  FindGameBySlug,
  FindGenresFromGame,
  FindPlatformsFromGame,
  FindThemesFromGame,
} from "@/lib/games";
import { FindPlatformNameBySlug } from "@/lib/platforms";
import { GetJWT } from "@/lib/session";
import { Game } from "@/lib/types";
import { FindUserLog } from "@/lib/users";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
function BacklogOverviewPage() {
  // Game Content Page Constants
  const PARAMS = useParams();
  const SLUG = typeof PARAMS.slug === "string" ? PARAMS.slug : "";
  const LOADING_GAME = {
    name: "Cargando",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum tellus sit amet varius luctus. Cras ac arcu ipsum. Maecenas viverra sem at vehicula vulputate. Suspendisse eget tincidunt nibh, id laoreet ipsum. Integer enim lacus, faucibus ut sapien id, commodo feugiat turpis. Nulla venenatis placerat lacus, ut commodo diam euismod a. In convallis tristique sapien nec fermentum. In hac habitasse platea dictumst. Cras feugiat sed tortor sit amet venenatis. Vivamus vel neque quam. Pellentesque dolor risus, blandit eget aliquam a, mattis id augue.",
    cover: null,
    background: null,
    rating: 0.0,
    classification: "-",
    year: "-",
    slug: "loading",
    video: "-",
    genres: [],
    platforms: [],
    themes: [],
    collection: "Cargando...",
    developer: "Cargando...",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum tellus sit amet varius luctus. Cras ac arcu ipsum. Maecenas viverra sem at vehicula vulputate. Suspendisse eget tincidunt nibh, id laoreet ipsum. Integer enim lacus, faucibus ut sapien id, commodo feugiat turpis. Nulla venenatis placerat lacus, ut commodo diam euismod a. In convallis tristique sapien nec fermentum. In hac habitasse platea dictumst. Cras feugiat sed tortor sit amet venenatis. Vivamus vel neque quam. Pellentesque dolor risus, blandit eget aliquam a, mattis id augue.",
    gameMode: "Cargando...",
  };
  const [log, SetLog] = useState<{
    game: Game;
    achievement: { name: string; value: string; logo: string | null };
    platform: string;
    rating: number;
    date: string;
    note: string | null;
  } | null>({
    game: LOADING_GAME,
    achievement: {
      name: "Cargando...",
      value: "-",
      logo: null,
    },
    platform: "Cargando...",
    rating: 0.0,
    date: "--/--/----",
    note: null,
  });
  useEffect(() => {
    const GetData = async () => {
      const CONTENT = await FindGameBySlug(SLUG);
      const EMAIL = GetJWT();
      if (CONTENT === undefined || EMAIL === undefined) {
        SetLog(null);
        return;
      }
      const LOG = await FindUserLog(EMAIL, CONTENT.slug);
      if (LOG === null || LOG === undefined) {
        SetLog(null);
        return;
      }
      const ACHIEVEMENT = FindAchievementById(LOG.achievement ?? 0);
      SetLog({
        game: CONTENT,
        achievement: {
          name:
            typeof ACHIEVEMENT === "object"
              ? ACHIEVEMENT.name
              : "No Completado",
          value: typeof ACHIEVEMENT === "object" ? `${ACHIEVEMENT.value}` : "-",
          logo: typeof ACHIEVEMENT === "object" ? ACHIEVEMENT.logo : null,
        },
        platform: FindPlatformNameBySlug(LOG.platform),
        rating: LOG.rating !== null ? LOG.rating : 0.0,
        date: LOG.date !== null ? LOG.date : "--/--/----",
        note: LOG.note,
      });
    };
    GetData();
  }, [SLUG]);
  // Returns Game Content Page
  return log !== null ? (
    // Game Content Main Container
    <div className="flex flex-col gap-3 p-10 max-w-4xl min-[897px]:mx-auto">
      <GameOverview
        title={log.game.name}
        cover={log.game.cover}
        background={log.game.background}
        date={log.game.year}
        themes={FindThemesFromGame(log.game.genres)}
        genres={FindGenresFromGame(log.game.genres)}
        platforms={
          log.game.platforms.length > 0
            ? FindPlatformsFromGame(log.game.platforms)
            : "N/A"
        }
        overview={log.game.summary}
        rating={log.game.rating}
        classification={log.game.classification}
        developer={log.game.developer}
        gameMode={log.game.gameMode}
        trailer={log.game.video}
        log={{
          achievement: log.achievement,
          platform: log.platform,
          rating: log.rating,
          date: log.date,
          note: log.note,
        }}
      />
    </div>
  ) : (
    <NotFound
      backTo={{
        name: "Mi Trayectoria",
        href: "/backlog",
      }}
    />
  );
}

export default BacklogOverviewPage;
