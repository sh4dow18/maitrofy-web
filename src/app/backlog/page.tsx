// Set this page as a client page
"use client";
// Backlog Page Requirements
import { BacklogCardBadge, Image } from "@/components";
import { GetJWT } from "@/lib/session";
import { GameLog } from "@/lib/types";
import { GetUserBacklog } from "@/lib/users";
import Link from "next/link";
import { useEffect, useState } from "react";
import { default as NextImage } from "next/image";
import { CalendarDaysIcon, StarIcon } from "@heroicons/react/16/solid";
// Backlog Page Main Function
function BacklogPage() {
  // Backlog Page Constants
  const BACKLOG_SKELETON = {
    game: {
      cover: null,
      name: "Cargando...",
      slug: "skeleton",
    },
    achievement: {
      name: "Cargando...",
      logo: null,
    },
    platform: "Cargando...",
    rating: null,
    date: null,
  };
  // Backlog Page Hooks
  const [gamesList, SetGamesList] = useState<GameLog[]>([
    BACKLOG_SKELETON,
    BACKLOG_SKELETON,
    BACKLOG_SKELETON,
    BACKLOG_SKELETON,
    BACKLOG_SKELETON,
    BACKLOG_SKELETON,
  ]);
  // Execute this useEffect when page is loading
  useEffect(() => {
    const JWT = GetJWT() ?? "";
    if (JWT === undefined) {
      return;
    }
    const GAMES_LIST = GetUserBacklog(JWT);
    SetGamesList(GAMES_LIST);
  }, []);
  return (
    // Games Page Main Container
    <div className="flex flex-col gap-10 px-7 py-7 lg:px-10">
      {/* Games Page Utilities Container */}
      <div className="flex place-content-between gap-3 min-[500px]:items-center min-[500px]:justify-center">
        {/* Games Page Utilities Title */}
        <h1 className="text-4xl leading-none font-bold text-gray-300 min-[373px]:text-5xl">
          Mi Trayectoria
        </h1>
      </div>
      {/* Games Page Games Container */}
      <div className="flex flex-wrap gap-5 place-content-center">
        {gamesList.map((game, index) => (
          <Link
            key={index}
            href={
              game.game.slug !== "skeleton" ? `/backlog/${game.game.slug}` : ""
            }
            className={`${
              game.game.slug !== "skeleton" ? "transition hover:scale-105" : ""
            } w-full min-[580px]:w-[233px] min-[1100px]:w-[500px]`.trimStart()}
          >
            {/* Game Log Card Container */}
            <div className="flex flex-col bg-gray-900 rounded-xl shadow shadow-gray-50/50 min-[1100px]:flex-row">
              {/* Game Log Card Image */}
              <Image
                src={
                  game.game.cover !== null
                    ? `https://images.igdb.com/igdb/image/upload/t_original/${game.game.cover}`
                    : "/skeletons/cover.webp"
                }
                alt={`${game.game.slug} Cover`}
                skeleton="cover"
                width={523}
                height={697}
                priority
                className="rounded-t-xl w-full min-[580px]:w-auto min-[580px]:h-[310px] min-[1100px]:w-[250px] min-[1100px]:rounded-l-xl min-[1100px]:rounded-tr-none"
              />
              {/* Game Log Card Section Information */}
              <section className="flex flex-col gap-3 p-4 w-full min-[1100px]:w-[260px]">
                {/* Achievement Backlog Card Badge */}
                <BacklogCardBadge
                  title="Logro"
                  value={game.achievement.name}
                  logo={
                    game.achievement.logo !== null ? (
                      <NextImage
                        src={
                          game.achievement.logo !== "playing"
                            ? `/achievements/${game.achievement.logo}.svg`
                            : "/favicon.svg"
                        }
                        alt={`${game.achievement.name} Logo`}
                        width={42}
                        height={game.achievement.logo !== "playing" ? 52 : 42}
                        className={`w-[42px] ${
                          game.achievement.logo !== "playing"
                            ? "h-[52px]"
                            : "h-[42px] my-[5px]"
                        }`}
                      />
                    ) : null
                  }
                />
                {/* Platform Backlog Card Badge */}
                <BacklogCardBadge
                  title="Plataforma"
                  value={game.platform}
                  logo={
                    <NextImage
                      src="/favicon.svg"
                      alt={`${game.achievement.name} Trophy Logo`}
                      width={52}
                      height={52}
                      className="my-[5px] w-[52px] h-[52px]"
                    />
                  }
                />
                {/* Rating Backlog Card Badge */}
                <BacklogCardBadge
                  title="Puntuación"
                  value={`${
                    game.rating !== null ? game.rating : "-"
                  } Estrellas`}
                  logo={
                    <StarIcon
                      className={`w-12 ${
                        game.rating !== null ? "fill-yellow-200" : ""
                      }`.trimEnd()}
                    />
                  }
                />
                {/* Date Backlog Card Badge */}
                <BacklogCardBadge
                  title="Obtenido"
                  value={game.date !== null ? game.date : "--/--/----"}
                  logo={
                    <CalendarDaysIcon
                      className={`w-12 ${
                        game.date !== null ? "fill-green-200" : ""
                      }`.trimEnd()}
                    />
                  }
                />
              </section>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BacklogPage;
