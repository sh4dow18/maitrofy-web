// Set this page as a client page
"use client";
// Backlog Page Requirements
import { Image } from "@/components";
import { GetJWT } from "@/lib/session";
import { GameLog } from "@/lib/types";
import { GetUserBacklog } from "@/lib/users";
import Link from "next/link";
import { useEffect, useState } from "react";
// Backlog Page Main Function
function BacklogPage() {
  // Backlog Page Constants
  const BACKLOG_SKELETON = {
    game: {
      cover: "/skeletons/cover.webp",
      name: "Cargando...",
      slug: "skeleton",
    },
    achievement: "Cargando...",
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
      <div className="flex flex-wrap gap-5 mx-auto max-w-[1600px] place-content-center">
        {gamesList.map((game, index) => (
          <Link
            key={index}
            href={`/backlog/${game.game.slug}`}
            className={`${
              game.game.slug === "skeleton"
                ? "animate-pulse"
                : "transition hover:scale-105"
            } w-full min-[500px]:w-[40%] min-[960px]:w-[30%] min-[1100px]:w-60`}
          >
            {/* Game Log Card Container */}
            <div className="flex flex-col bg-gray-900 rounded-xl shadow shadow-gray-50/50">
              {/* Game Log Card Image */}
              <Image
                src={game.game.cover}
                alt={`${game.game.slug} Cover`}
                skeleton="cover"
                width={420}
                height={560}
                priority
                className="w-full rounded-t-xl"
              />
              {/* Game Log Card Section Information */}
              <section className="flex flex-col gap-3 mx-5 my-5">
                {/* Game Log Card Section Title */}
                <h2 className="text-xl font-semibold text-gray-200 line-clamp-1">
                  {game.game.name}
                </h2>
                {/* Game Log Card Section Information Container */}
                <div className="flex flex-col gap-3">
                  {/* Game Log Card Section Achievement */}
                  <span>
                    <strong>Logro</strong>:{" "}
                    {game.achievement !== "N/A"
                      ? game.achievement
                      : "No Completado"}
                  </span>
                  {/* Game Log Card Section Platform */}
                  <span className="line-clamp-1">
                    <strong>Plataforma</strong>: {game.platform}
                  </span>
                  {/* Game Log Card Section Rating */}
                  <span>
                    <strong>Puntuación</strong>:{" "}
                    {game.rating !== null ? game.rating / 2 : "-"}
                  </span>
                  {/* Game Log Card Section Date */}
                  <span>
                    <strong>Obtenido</strong>:{" "}
                    {game.date !== null ? game.date : "--/--/----"}
                  </span>
                </div>
              </section>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BacklogPage;
