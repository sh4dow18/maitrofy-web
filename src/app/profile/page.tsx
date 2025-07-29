// Set this page as a client page
"use client";
// Profile Page Requirements
import { Image, ProfileSection } from "@/components";
import { default as NextImage } from "next/image";
import { GetJWT, RemoveJWT } from "@/lib/session";
import { User } from "@/lib/types";
import { GetUser } from "@/lib/users";
import {
  BookmarkIcon,
  CalendarDaysIcon,
  TrophyIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdCollectionsBookmark, MdEmail, MdFactory } from "react-icons/md";
import { AiFillExperiment } from "react-icons/ai";
import { GiFinishLine, GiJumpAcross } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { BiSolidGame } from "react-icons/bi";
// Profile Page Main Function
function ProfilePage() {
  // Profile Page Hooks
  const [user, SetUser] = useState<User>({
    backgroundImage: null,
    profileImage: null,
    name: "Usuario No Encontrado",
    email: "example@example.com",
    date: "--/--/----",
    role: "No Encontrado",
    level: "No Encontrado",
    status: "Estado no Encontrado",
    gamesCount: "-",
    completed: "-",
    platinum: "-",
    pseudoPlatinum: "-",
    offlinePlatinum: "-",
    psicoPlatinum: "-",
    points: "-",
    ranking: "#-",
    favoriteGame: "Juego No Encontrado",
    favoriteTheme: "Tema No Encontrada",
    favoriteGenre: "Género No Encontrada",
    favoritePlatform: "Plataforma No Encontrada",
    favoriteCollection: "Colección No Encontrada",
    favoriteDeveloper: "Desarrolladora No Encontrada",
    favoriteGameMode: "Modo de Juego No Encontrado",
  });
  // Execute this useEffect when page is loading
  useEffect(() => {
    const JWT = GetJWT() ?? "";
    if (JWT === undefined) {
      return;
    }
    const USER = GetUser(JWT);
    if (USER === null) {
      return;
    }
    SetUser(USER);
  }, []);
  // Profile Page Constants
  const INFORMATION_LIST = [
    {
      title: "Correo Electrónico",
      value: user.email,
      logo: <MdEmail className="w-10 h-10 fill-gray-200" />,
    },
    {
      title: "Creado",
      value: user.date,
      logo: <CalendarDaysIcon className="w-10 fill-green-200" />,
    },
    {
      title: "Estado",
      value: user.status,
      logo: <FaCheckCircle className="w-10 h-10 fill-amber-200" />,
    },
    {
      title: "Rol",
      value: user.role,
      logo: <UserIcon className="w-10 fill-cyan-200" />,
    },
  ];
  const STATISTICS_LIST = [
    {
      title: "Nivel",
      value: user.level,
      logo: <TrophyIcon className="w-10 fill-orange-200" />,
    },
    {
      title: "Registrados",
      value: user.gamesCount,
      logo: <BookmarkIcon className="w-10 fill-lime-300" />,
    },
    {
      title: "Completados",
      value: user.completed,
      logo: (
        <NextImage
          src="/achievements/completed.svg"
          alt="Completed Trophy Logo"
          width={52}
          height={52}
          className="w-[52px] h-[52px]"
        />
      ),
    },
    {
      title: "Platinos",
      value: user.platinum,
      logo: (
        <NextImage
          src="/achievements/platinum.svg"
          alt="Platinum Trophy Logo"
          width={52}
          height={52}
          className="w-[52px] h-[52px]"
        />
      ),
    },
    {
      title: "PseudoPlatinos",
      value: user.pseudoPlatinum,
      logo: (
        <NextImage
          src="/achievements/pseudo.svg"
          alt="Pseudo Platinum Trophy Logo"
          width={52}
          height={52}
          className="w-[52px] h-[52px]"
        />
      ),
    },
    {
      title: "Platinos Offline",
      value: user.offlinePlatinum,
      logo: (
        <NextImage
          src="/achievements/offline.svg"
          alt="Offline Platinum Trophy Logo"
          width={52}
          height={52}
          className="w-[52px] h-[52px]"
        />
      ),
    },
    {
      title: "PsicoPlatinos",
      value: user.psicoPlatinum,
      logo: (
        <NextImage
          src="/achievements/psico.svg"
          alt="PsicoPlatinum Trophy Logo"
          width={52}
          height={52}
          className="w-[52px] h-[52px]"
        />
      ),
    },
    {
      title: "Puntos",
      value: user.points,
      logo: <AiFillExperiment className="w-10 h-10 fill-purple-200" />,
    },
    {
      title: "Ranking",
      value: user.ranking,
      logo: <GiFinishLine className="w-10 h-10 fill-gray-200" />,
    },
  ];
  const PREFERENCES_LIST = [
    {
      title: "Juego Preferido",
      value: user.favoriteGame,
      logo: <BiSolidGame className="w-10 h-10 fill-yellow-200" />,
    },
    {
      title: "Tema Preferido",
      value: user.favoriteTheme,
      logo: <FaBook className="w-10 h-10 fill-[#D2B48C]" />,
    },
    {
      title: "Género Preferido",
      value: user.favoriteGenre,
      logo: <GiJumpAcross className="w-10 h-10 fill-fuchsia-200" />,
    },
    {
      title: "Plataforma Preferida",
      value: user.favoritePlatform,
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
      value: user.favoriteCollection,
      logo: <MdCollectionsBookmark className="w-10 h-10 fill-indigo-300" />,
    },
    {
      title: "Desarrolladora Preferida",
      value: user.favoriteDeveloper,
      logo: <MdFactory className="w-10 h-10 fill-red-200" />,
    },
    {
      title: "Modo Preferido",
      value: user.favoriteGameMode,
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
              user.backgroundImage !== null
                ? `https://images.igdb.com/igdb/image/upload/t_original/${user.backgroundImage}`
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
              src={user.profileImage || "/profile.webp"}
              alt={`${user.name} Profile Image`}
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
            {user.name}
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
