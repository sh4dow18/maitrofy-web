// Set this page as a client page
"use client";
// Backlog Page Requirements
import { Image } from "@/components";
import { GetJWT } from "@/lib/session";
import { GameLog } from "@/lib/types";
import { GetUserBacklog } from "@/lib/users";
import Link from "next/link";
import { useEffect, useState } from "react";
import { default as NextImage } from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CalendarDaysIcon, StarIcon } from "@heroicons/react/16/solid";
// Backlog Page Main Function
function BacklogPage() {
  // Backlog Page Constants
  const BACKLOG_SKELETON = {
    game: {
      cover: "/skeletons/cover.webp",
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
              game.game.slug === "skeleton"
                ? "animate-pulse"
                : "transition hover:scale-105"
            } max-[580px]:w-full min-[1100px]:w-[500px]`}
          >
            {/* Game Log Card Container */}
            <div className="flex flex-col bg-gray-900 rounded-xl shadow shadow-gray-50/50 min-[1100px]:flex-row">
              {/* Game Log Card Image */}
              <Image
                src={game.game.cover}
                alt={`${game.game.slug} Cover`}
                skeleton="cover"
                width={523}
                height={697}
                priority
                className="rounded-t-xl w-full min-[580px]:w-auto min-[580px]:h-[310px] min-[1100px]:w-[250px] min-[1100px]:rounded-l-xl"
              />
              {/* Game Log Card Section Information */}
              <section className="flex flex-col gap-3 m-4">
                {/* Game Log Card Section Information Container */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Game Log Card Section Achievement Container */}
                  <div className="flex flex-col place-items-center gap-2">
                    {/* Game Log Card Section Achievement Title */}
                    <span>
                      <strong>Logro</strong>
                    </span>
                    {/* Game Log Card Section Achievement Image */}
                    <div className="flex flex-col place-items-center gap-2 bg-gray-800 p-2 w-full rounded-md">
                      {game.achievement.logo !== null ? (
                        <NextImage
                          src={
                            game.achievement.logo !== "playing"
                              ? `/achievements/${game.achievement.logo}.svg`
                              : "/favicon.svg"
                          }
                          alt={`${game.achievement.name} Logo`}
                          width={52}
                          height={game.achievement.logo !== "playing" ? 62 : 52}
                          className={`w-[52px] ${
                            game.achievement.logo !== "playing"
                              ? "h-[62px]"
                              : "h-[52px] my-[5px]"
                          }`}
                        />
                      ) : (
                        // If it is loading
                        <AiOutlineLoading3Quarters className="w-[87px] h-[62px] animate-spin p-2" />
                      )}
                      {/* Game Log Card Section Achievement Name */}
                      <span className="text-sm">{game.achievement.name}</span>
                    </div>
                  </div>
                  {/* Game Log Card Section Platform Container */}
                  <div className="flex flex-col place-items-center gap-2">
                    {/* Game Log Card Section Platform Title */}
                    <span>
                      <strong>Plataforma</strong>
                    </span>
                    <div className="flex flex-col place-items-center gap-2 bg-gray-800 p-2 w-full rounded-md">
                      {/* Game Log Card Section Platform Image */}
                      <NextImage
                        src="/favicon.svg"
                        alt={`${game.achievement.name} Trophy Logo`}
                        width={52}
                        height={52}
                        className="my-[5px] w-[52px] h-[52px]"
                      />
                      {/* Game Log Card Section Platform Name */}
                      <span className="text-sm line-clamp-1 w-22">
                        {game.platform}
                      </span>
                    </div>
                  </div>
                  {/* Game Log Card Section Rating Container */}
                  <div className="flex flex-col place-items-center gap-2">
                    {/* Game Log Card Section Rating Title */}
                    <span>
                      <strong>Puntuación</strong>
                    </span>
                    <div className="flex flex-col place-items-center gap-2 bg-gray-800 p-2 w-full rounded-md">
                      {/* Game Log Card Section Rating Image */}
                      <StarIcon
                        className={`w-12 ${
                          game.rating !== null ? "fill-yellow-200" : ""
                        }`.trimEnd()}
                      />
                      {/* Game Log Card Section Rating String */}
                      <span className="text-sm line-clamp-1">
                        {game.rating !== null ? game.rating : "-"} Estrellas
                      </span>
                    </div>
                  </div>
                  {/* Game Log Card Section Date Container */}
                  <div className="flex flex-col place-items-center gap-2">
                    {/* Game Log Card Section Date Title */}
                    <span>
                      <strong>Obtenido</strong>
                    </span>
                    <div className="flex flex-col place-items-center gap-2 bg-gray-800 p-2 w-full rounded-md">
                      {/* Game Log Card Section Date Image */}
                      <CalendarDaysIcon
                        className={`w-12 ${
                          game.date !== null ? "fill-green-200" : ""
                        }`.trimEnd()}
                      />
                      {/* Game Log Card Section Date String */}
                      <span className="text-sm line-clamp-1">
                        {game.date !== null ? game.date : "--/--/----"}
                      </span>
                    </div>
                  </div>
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
