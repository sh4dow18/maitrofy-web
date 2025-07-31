// Game Overview Requirements
import {
  CalendarDaysIcon,
  PlusIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import Image from "./image";
import YoutubeVideo from "./youtube-video";
import { default as NextImage } from "next/image";
import { FaBook, FaPerson } from "react-icons/fa6";
import { MdFactory } from "react-icons/md";
import { GiJumpAcross } from "react-icons/gi";
import { AiFillExperiment } from "react-icons/ai";
// Game Overview Props
interface Props {
  title: string;
  cover: string | null;
  background: string | null;
  date: string;
  genres: string;
  platforms: string;
  themes: string;
  overview: string;
  rating: number;
  classification: string | null;
  developer: string;
  gameMode: string | null | undefined;
  trailer: string | null;
  log?: {
    achievement: {
      name: string;
      value: string;
      logo: string | null;
    };
    platform: string;
    rating: number;
    date: string;
    note: string | null;
  };
}
// Game Overview Main Container
function GameOverview({
  title,
  cover,
  background,
  date,
  genres,
  platforms,
  themes,
  overview,
  rating,
  classification,
  developer,
  gameMode,
  trailer,
  log,
}: Props) {
  // Game Overview Constants
  const GAME_INFORMATION_LIST = [
    {
      title: "Valoración",
      value: `${rating} Estrellas`,
      logo: <StarIcon className="w-12 fill-yellow-200" />,
    },
    {
      title: "Clasificación",
      value: classification,
      logo: <FaPerson className="w-12 h-12 fill-gray-200" />,
    },
    {
      title: "Desarrollador",
      value: developer,
      logo: <MdFactory className="w-12 h-12 fill-red-200" />,
    },
    {
      title: "Modo",
      value: gameMode !== "" ? gameMode : "N/A",
      logo: <UserGroupIcon className="w-12 fill-blue-300" />,
    },
    {
      title: "Temas",
      value: themes !== "" ? themes : "N/A",
      logo: <FaBook className="w-12 h-12 fill-[#D2B48C]" />,
    },
    {
      title: "Géneros",
      value: genres !== "" ? genres : "N/A",
      logo: <GiJumpAcross className="w-12 h-12 fill-fuchsia-200" />,
    },
    {
      title: "Plataformas",
      value: platforms,
      logo: (
        <NextImage
          src="/favicon.svg"
          alt="Platform Logo"
          width={52}
          height={52}
          className="mx-2 w-[52px] h-[52px]"
        />
      ),
    },
  ];
  const LOG_INFORMATION_LIST = [
    {
      title: "Logro",
      value: log !== undefined ? log.achievement.name : "",
      logo: (
        <NextImage
          src={
            log !== undefined && log.achievement.logo !== null
              ? `/achievements/${log.achievement.logo}.svg`
              : "/favicon.svg"
          }
          alt="Trophy Logo"
          width={48}
          height={48}
          className="mx-2 w-12 h-12"
        />
      ),
    },
    {
      title: "Valor de Logro",
      value: log !== undefined ? `${log.achievement.value} Puntos` : "",
      logo: <AiFillExperiment className="w-12 h-12 fill-purple-200" />,
    },
    {
      title: "Plataforma",
      value: log !== undefined ? log.platform : "",
      logo: (
        <NextImage
          src="/favicon.svg"
          alt="Platform Logo"
          width={52}
          height={52}
          className="mx-2 w-[52px] h-[52px]"
        />
      ),
    },
    {
      title: "Registrado",
      value: log !== undefined ? log.date : "",
      logo: <CalendarDaysIcon className="w-12 fill-green-200" />,
    },
    {
      title: "Valoración",
      value: log !== undefined ? `${log.rating} Estrellas` : "",
      logo: <StarIcon className="w-12 fill-yellow-200" />,
    },
  ];
  // Returns Game Overview Component
  return (
    // Game Overview Container
    <div className="flex flex-col gap-5">
      {/* Game Overview Images Container */}
      <div className="min-[600px]:relative">
        {/* Game Overview Background Image */}
        <Image
          src={
            background !== null
              ? `https://images.igdb.com/igdb/image/upload/t_original/${background}`
              : "/404.png"
          }
          alt="Fondo decorativo"
          skeleton="background"
          fill
          className="hidden object-cover object-center -z-10 mask-image rounded-t-sm min-[600px]:block"
          priority
        />
        {/* Game Overview images Second Container */}
        <div className="flex flex-col gap-5 min-[600px]:flex-row min-[600px]:place-content-between min-[600px]:pt-30 min-[600px]:px-3 min-[600px]:pb-3">
          {/* Game Overview Image Cover */}
          <Image
            src={
              cover !== null
                ? `https://images.igdb.com/igdb/image/upload/t_original/${cover}`
                : "/skeletons/cover.webp"
            }
            alt={`${title} Cover`}
            skeleton="cover"
            width={600}
            height={635}
            priority
            className="rounded-lg w-full min-[600px]:w-44 min-[600px]:h-[234px] min-[600px]:shadow-sm shadow-gray-700"
          />
          {/* Game Overview Button Container */}
          <div className="mt-auto">
            {log === undefined ? (
              // Add Log Button
              <button
                className="flex gap-1 items-center justify-center bg-gray-400 text-xl py-2 px-5 rounded-sm text-gray-900 font-semibold w-full"
                disabled
              >
                <PlusIcon className="w-6 h-6" />
                <span>Agregar</span>
              </button>
            ) : (
              // Achievement Display Container
              <div className="flex place-content-center place-items-center gap-2 bg-gray-800 rounded-md px-2 shadow shadow-gray-300/50 p-1">
                <NextImage
                  src={
                    log.achievement.logo !== null
                      ? `/achievements/${log.achievement.logo}.svg`
                      : "/favicon.svg"
                  }
                  alt={`${log.achievement.value} Trophy Logo`}
                  width={32}
                  height={32}
                  className="my-[5px] w-[32px] h-[32px]"
                />
                <span className="text-lg text-gray-100">
                  <strong>{log.achievement.name}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Game Overview Description Container */}
      <section className="flex flex-col gap-3">
        {/* Game Overview Description Main Title */}
        <h1 className="text-4xl text-center leading-14 font-bold text-gray-300 min-[351px]:text-5xl min-[600px]:text-4xl min-[600px]:text-left min-[600px]:leading-12">
          {title} ({date})
        </h1>
        {/* Game Overview Description Second Container */}
        <section className="flex flex-col gap-1">
          {/* Game Overview Description Title */}
          <span className="font-semibold text-gray-300">Descripción</span>
          {/* Game Overview Description Paragraph */}
          <p className="leading-7 hyphens-auto">{overview}</p>
        </section>
      </section>
      <div className="flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap">
        {/* Game Overview Extra Information Rating Section */}
        {GAME_INFORMATION_LIST.map((game, index) => (
          // Game Overview Extra Information Section
          <section
            className="flex gap-2 place-content-between bg-gray-800 place-items-center p-2 rounded-md"
            key={index}
          >
            <div className="flex flex-col gap-1">
              {/* Game Overview Extra Information Title */}
              <span className="text-gray-300 font-semibold">{game.title}</span>
              {/* Game Overview Extra Information */}
              <span>{game.value}</span>
            </div>
            {game.logo}
          </section>
        ))}
      </div>
      {log !== undefined && (
        <>
          {/* ame Overview Extra Information Title */}
          <h2 className="text-gray-300 font-bold text-xl">Registro de Juego</h2>
          {/* Game Overview Extra Information Container */}
          <div className="flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap">
            {LOG_INFORMATION_LIST.map((log, index) => (
              // Game Overview Extra Information Section
              <section
                className="flex gap-2 place-content-between bg-gray-800 place-items-center p-2 rounded-md w-full min-[621px]:w-[48%] min-[880px]:w-[32%]"
                key={index}
              >
                <div className="flex flex-col gap-1">
                  {/* Game Overview Extra Information Title */}
                  <span className="font-semibold text-gray-300">
                    {log.title}
                  </span>
                  {/* Game Overview Extra Information */}
                  <span>{log.value}</span>
                </div>
                {log.logo}
              </section>
            ))}
          </div>
          {log.note !== null && (
            // Game Overview Note Section
            <section>
              {/* Game Overview Note Section Title */}
              <span className="font-semibold text-gray-300">Nota</span>
              {/* Game Overview Note Section Description */}
              <blockquote className="italic text-gray-200 bg-gray-800 border-l-4 border-l-primary p-4 mt-2">
                {log.note}
              </blockquote>
            </section>
          )}
        </>
      )}
      {/* Game Overview Trailer Section */}
      {typeof trailer === "string" && log === undefined && (
        <section className="flex flex-col gap-1">
          {/* Game Page Trailer Main Title */}
          <span className="font-semibold text-gray-300">Trailer</span>
          {/* Game Page Trailer */}
          <YoutubeVideo
            id={trailer}
            title={title}
            fallbackImage={
              background !== null
                ? `https://images.igdb.com/igdb/image/upload/t_original/${background}`
                : "/404.png"
            }
          />
        </section>
      )}
    </div>
  );
}

export default GameOverview;
