// Set this page as a client page
"use client";
// Profile Page Requirements
import { Image, ProfileSection } from "@/components";
import { default as NextImage } from "next/image";
import { RemoveJWT } from "@/lib/session";
import { UserResponse } from "@/lib/types";
import {
  BookmarkIcon,
  CalendarDaysIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { MdCollectionsBookmark, MdFactory } from "react-icons/md";
import { AiFillExperiment } from "react-icons/ai";
import { GiJumpAcross } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { BiSolidGame } from "react-icons/bi";
import { FindProfileWithUser } from "@/lib/users";
// Profile Page Main Function
function ProfilePage() {
  // Profile Page Hooks
  const [user, SetUser] = useState<UserResponse>({
    account: {
      id: 0,
      name: "Cargando...",
      date: "--/--/----",
    },
    statistics: {
      gameLogsCount: 0,
      achievementsList: [],
      points: 0,
    },
    preferences: {
      game: {
        name: "Cargando...",
        cover: null,
        background: null,
      },
      theme: "Cargando...",
      genre: "Cargando...",
      platform: "Cargando...",
      collection: "Cargando...",
      developer: "Cargando...",
      gameMode: "Cargando...",
    },
  });
  // Execute this useEffect when page is loading
  useEffect(() => {
    const GetData = async () => {
      // Find Profile with User in JWT
      const RESPONSE = await FindProfileWithUser();
      // If Status exists in Response, that is Error Response, so, return to login and remove JWT
      if ("status" in RESPONSE) {
        RemoveJWT();
        window.location.href = "/login";
        return;
      }
      // Set user
      SetUser(RESPONSE);
    };
    GetData();
  }, []);
  // Profile Page Constants
  const INFORMATION_LIST = [
    {
      title: "Creado",
      value: user.account.date,
      logo: <CalendarDaysIcon className="w-10 fill-green-200" />,
    },
  ];
  const STATISTICS_LIST = [
    {
      title: "Registrados",
      value: user.statistics.gameLogsCount,
      logo: <BookmarkIcon className="w-10 fill-lime-300" />,
    },
    {
      title: "Puntos",
      value: user.statistics.points,
      logo: <AiFillExperiment className="w-10 h-10 fill-purple-200" />,
    },
  ];
  const PREFERENCES_LIST = [
    {
      title: "Juego Preferido",
      value: user.preferences.game ? user.preferences.game.name : "No Posee",
      logo: <BiSolidGame className="w-10 h-10 fill-yellow-200" />,
    },
    {
      title: "Tema Preferido",
      value: user.preferences.theme,
      logo: <FaBook className="w-10 h-10 fill-[#D2B48C]" />,
    },
    {
      title: "Género Preferido",
      value: user.preferences.genre,
      logo: <GiJumpAcross className="w-10 h-10 fill-fuchsia-200" />,
    },
    {
      title: "Plataforma Preferida",
      value: user.preferences.platform,
      logo: (
        <NextImage
          src="/favicon.svg"
          alt="Platform Logo"
          width={52}
          height={52}
          className="w-[52px] h-[52px]"
        />
      ),
    },
    {
      title: "Colección Preferida",
      value: user.preferences.collection,
      logo: <MdCollectionsBookmark className="w-10 h-10 fill-indigo-300" />,
    },
    {
      title: "Desarrolladora Preferida",
      value: user.preferences.developer,
      logo: <MdFactory className="w-10 h-10 fill-red-200" />,
    },
    {
      title: "Modo Preferido",
      value: user.preferences.gameMode,
      logo: <UserGroupIcon className="w-10 fill-blue-300" />,
    },
  ];
  // Returns Profile Page
  return (
    <div className="flex flex-col gap-3 p-10 max-w-4xl min-[897px]:mx-auto">
      {/* Profile Page Container */}
      <div className="flex flex-col gap-5">
        {/* Profile Page Images Container */}
        <div className="min-[600px]:relative">
          {/* Profile Page Background Image */}
          <Image
            src={
              user.preferences.game !== null &&
              user.preferences.game.background != null
                ? `https://images.igdb.com/igdb/image/upload/t_original/${user.preferences.game.background}`
                : "/404.png"
            }
            alt="Background Image"
            skeleton="background"
            fill
            className="hidden object-cover object-center -z-10 mask-image rounded-t-sm min-[600px]:block"
            priority
          />
          {/* Profile Page images Second Container */}
          <div className="flex flex-col gap-5 min-[600px]:flex-row min-[600px]:place-content-between min-[600px]:pt-30 min-[600px]:px-3 min-[600px]:pb-3">
            {/* Profile Page Image Cover */}
            <Image
              src={`/profile-${user.account.id}.webp`}
              alt={`${user.account.name} Profile Image`}
              skeleton="profile"
              width={600}
              height={600}
              priority
              className="rounded-lg w-full min-[600px]:w-44 min-[600px]:shadow-sm shadow-gray-700"
            />
          </div>
        </div>
        {/* Profile Page Description Container */}
        <section className="flex flex-col gap-3">
          {/* Profile Page Description Main Title */}
          <h1 className="text-4xl text-center leading-14 font-bold text-gray-300 min-[351px]:text-5xl min-[600px]:text-4xl min-[600px]:text-left min-[600px]:leading-12">
            {user.account.name}
          </h1>
          {/* Account Information Profile Section */}
          <ProfileSection
            title="Información de Cuenta"
            list={INFORMATION_LIST}
          />
          {/* Statistics Profile Section */}
          <ProfileSection title="Estadísticas" list={STATISTICS_LIST} />
          {/* Preferences Profile Section */}
          <ProfileSection title="Preferencias" list={PREFERENCES_LIST} />
          {/* Achievements Profile Section */}
          {user.statistics.achievementsList.length > 0 && (
            <ProfileSection
              title="Trofeos"
              list={user.statistics.achievementsList.map((achievement) => ({
                title: achievement.achievement.name,
                value: achievement.amount,
                logo: (
                  <NextImage
                    src={`/achievements/${achievement.achievement.logo}.svg`}
                    alt={`${achievement.achievement.name} Trophy Logo`}
                    width={52}
                    height={52}
                    className="w-[52px] h-[52px]"
                  />
                ),
              }))}
            />
          )}
        </section>
        {/* Profile Page CTA Section */}
        <section className="flex flex-col gap-5 mt-5 min-[400px]:grid min-[400px]:grid-cols-2 min-[400px]:gap-5">
          {/* Profile Page Log out Button */}
          <button
            className="bg-gray-300 text-black py-2 rounded-md cursor-pointer font-semibold hover:bg-gray-50"
            onClick={() => {
              RemoveJWT();
              location.reload();
            }}
          >
            Cerrar Sesión
          </button>
          {/* Profile Page Delete Account Button */}
          <button
            className="bg-gray-500 text-black py-2 rounded-md font-semibold cursor-not-allowed"
            disabled
          >
            Eliminar Cuenta
          </button>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
