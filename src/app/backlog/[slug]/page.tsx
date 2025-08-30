"use client";
import { GameOverview, NotFound } from "@/components";
import { RemoveJWT } from "@/lib/session";
import { GameLogResponse } from "@/lib/types";
import { FindUserLog } from "@/lib/users";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
function BacklogOverviewPage() {
  // Game Content Page Constants
  const PARAMS = useParams();
  const SLUG = typeof PARAMS.slug === "string" ? PARAMS.slug : "";
  const [log, SetLog] = useState<GameLogResponse>({
    slug: "loading",
    rating: null,
    date: "--/--/----",
    review: null,
    hoursSpend: null,
    game: {
      slug: "loading",
      name: "Cargando",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum tellus sit amet varius luctus. Cras ac arcu ipsum. Maecenas viverra sem at vehicula vulputate. Suspendisse eget tincidunt nibh, id laoreet ipsum. Integer enim lacus, faucibus ut sapien id, commodo feugiat turpis. Nulla venenatis placerat lacus, ut commodo diam euismod a. In convallis tristique sapien nec fermentum. In hac habitasse platea dictumst. Cras feugiat sed tortor sit amet venenatis. Vivamus vel neque quam. Pellentesque dolor risus, blandit eget aliquam a, mattis id augue.",
      cover: "null",
      background: "null",
      rating: 0.0,
      classification: "-",
      year: 0,
      video: "-",
      collection: "Cargando...",
      developer: "Cargando...",
      gameMode: "Cargando...",
      themes: "-",
      genres: "-",
      platforms: "-",
    },
    platform: null,
    achievement: null,
  });
  useEffect(() => {
    const GetData = async () => {
      const RESPONSE = await FindUserLog(SLUG);
      // If Status exists in Response, that is Error Response, so, return to login and remove JWT
      if ("status" in RESPONSE) {
        RemoveJWT();
        window.location.href = "/login";
        return;
      }
      SetLog(RESPONSE);
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
        themes={log.game.themes}
        genres={log.game.genres}
        platforms={log.game.platforms}
        overview={log.game.summary}
        rating={log.game.rating}
        classification={log.game.classification}
        developer={log.game.developer}
        gameMode={log.game.gameMode}
        trailer={log.game.video}
        slug={log.game.slug}
        log={{
          achievement:
            log.achievement != null
              ? {
                  name: log.achievement.name,
                  value: log.achievement.points,
                  logo: log.achievement.logo,
                }
              : null,
          platform: log.platform,
          rating: log.rating,
          date: log.date,
          note: log.review,
          time: log.hoursSpend,
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
