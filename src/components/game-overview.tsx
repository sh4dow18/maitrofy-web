// Game Overview Requirements
import { PlusIcon, TrophyIcon } from "@heroicons/react/16/solid";
import Image from "./image";
import Stars from "./stars";
import YoutubeVideo from "./youtube-video";
// Game Overview Props
interface Props {
  title: string;
  cover: string;
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
  story: string | null;
  trailer: string | null;
  log?: {
    achievement: {
      name: string;
      value: string;
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
  story,
  trailer,
  log,
}: Props) {
  const GAME_INFORMATION_LIST = [
    { title: "Clasificación", value: classification },
    { title: "Desarrollador", value: developer },
    {
      title: "Modo de Juego",
      value: typeof gameMode === "string" ? gameMode : "N/A",
    },
    { title: "Temas", value: themes !== "" ? themes : "N/A" },
    { title: "Géneros", value: genres !== "" ? genres : "N/A" },
    { title: "Plataformas", value: platforms },
  ];
  const LOG_INFORMATION_LIST = [
    { title: "Logro", value: log !== undefined ? log.achievement.name : "" },
    {
      title: "Puntos por Logro",
      value: log !== undefined ? log.achievement.value : "",
    },
    { title: "Plataforma Usada", value: log !== undefined ? log.platform : "" },
    { title: "Registrado", value: log !== undefined ? log.date : "" },
  ];
  // Returns Game Overview Component
  return (
    // Game Overview Container
    <div className="flex flex-col gap-5">
      {/* Game Overview Images Container */}
      <div className="min-[600px]:relative">
        {/* Game Overview Background Image */}
        <Image
          src={background || "/404.png"}
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
            src={cover}
            alt={`${title} Cover`}
            skeleton="cover"
            width={600}
            height={635}
            priority
            className="rounded-lg w-full min-[600px]:w-44 min-[600px]:shadow-sm shadow-gray-700"
          />
          {/* Game Overview Button Container */}
          <div className="mt-auto">
            <button
              className="flex gap-1 items-center justify-center bg-gray-300 text-xl py-2 px-5 rounded-sm text-gray-900 font-semibold w-full"
              disabled
            >
              {log === undefined ? (
                <>
                  <PlusIcon className="w-6 h-6" />
                  <span>Agregar</span>
                </>
              ) : (
                <>
                  <TrophyIcon className="w-6 h-6" />
                  <span>{log.achievement.name}</span>
                </>
              )}
            </button>
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
        {story !== null && (
          // Game Overview Description Story Container
          <section className="flex flex-col gap-1">
            {/* Game Overview Description Story Title */}
            <span className="font-semibold text-gray-300">Historia</span>
            {/* Game Overview Description Story Paragraph */}
            <p className="leading-7 hyphens-auto">{story}</p>
          </section>
        )}
      </section>
      <div className="flex flex-col gap-5 min-[477px]:flex-row min-[477px]:flex-wrap min-[477px]:items-center">
        {/* Game Overview Extra Information Rating Section */}
        <section className="flex flex-col gap-1">
          {/* Game Overview Extra Information Rating Title */}
          <span className="font-semibold text-gray-300">Valoración</span>
          {/* Game Overview Extra Information Rating Stars */}
          <div className="flex items-center">
            <Stars count={5} size={30} value={rating} />
            <span className="hidden text-lg font-semibold ml-2 mt-1 min-[352px]:block">
              ({rating})
            </span>
          </div>
        </section>
        {GAME_INFORMATION_LIST.map((game, index) => (
          // Game Overview Extra Information Section
          <section className="flex flex-col gap-2" key={index}>
            {/* Game Overview Extra Information Title */}
            <span className="font-semibold text-gray-300">{game.title}</span>
            {/* Game Overview Extra Information */}
            <span>{game.value}</span>
          </section>
        ))}
        {log !== undefined && (
          <>
            {LOG_INFORMATION_LIST.map((log, index) => (
              // Game Overview Extra Information Section
              <section className="flex flex-col gap-2" key={index}>
                {/* Game Overview Extra Information Title */}
                <span className="font-semibold text-gray-300">{log.title}</span>
                {/* Game Overview Extra Information */}
                <span>{log.value}</span>
              </section>
            ))}
            {/* Game Overview Extra Information User Rating Section */}
            <section className="flex flex-col gap-1">
              {/* Game Overview Extra Information User Rating Title */}
              <span className="font-semibold text-gray-300">
                Valoración Final
              </span>
              {/* Game Overview Extra Information User Rating Stars */}
              <div className="flex items-center">
                <Stars count={5} size={30} value={log.rating} />
                <span className="hidden text-lg font-semibold ml-2 mt-1 min-[352px]:block">
                  ({log.rating})
                </span>
              </div>
            </section>
          </>
        )}
      </div>
      {log !== undefined && log.note !== null && (
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
      {/* Game Overview Trailer Section */}
      {typeof trailer === "string" && (
        <section className="flex flex-col gap-1">
          {/* Game Page Trailer Main Title */}
          <span className="font-semibold text-gray-300">Trailer</span>
          {/* Game Page Trailer */}
          <YoutubeVideo id={trailer} title={title} />
        </section>
      )}
    </div>
  );
}

export default GameOverview;
