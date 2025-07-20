// Game Overview Requirements
import { PlusIcon } from "@heroicons/react/16/solid";
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
  note: string | null;
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
  note,
}: Props) {
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
              <PlusIcon className="w-6 h-6" />
              <span>Agregar</span>
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
        {/* Game Overview Extra Information Container */}
        <div className="flex flex-col gap-3 min-[477px]:flex-row min-[477px]:flex-wrap min-[477px]:items-center">
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
          {/* Game Overview Extra Information Clasification Section */}
          <section className="flex flex-col gap-2 min-[477px]:ml-5">
            {/* Game Overview Extra Information Clasification Title */}
            <span className="font-semibold text-gray-300">Clasificación</span>
            {/* Game Overview Extra Information Clasification */}
            <span>{classification}</span>
          </section>
          {/* Game Overview Extra Information Developer Section */}
          <section className="flex flex-col gap-2 min-[477px]:ml-5">
            {/* Game Overview Extra Information Developer Title */}
            <span className="font-semibold text-gray-300">Desarrollador</span>
            {/* Game Overview Extra Information Developer */}
            <span>{developer}</span>
          </section>
        </div>
      </section>
      <div className="flex flex-col gap-5 min-[477px]:flex-row min-[477px]:flex-wrap min-[477px]:items-center">
        {/* Game Overview Extra Information Game Mode Section */}
        <section className="flex flex-col gap-2">
          {/* Game Overview Extra Information Game Mode Title */}
          <span className="font-semibold text-gray-300">Modo de Juego</span>
          {/* Game Overview Extra Information Game Mode */}
          <span>{typeof gameMode === "string" ? gameMode : "N/A"}</span>
        </section>
        {/* Game Overview Extra Information Themes Section */}
        <section className="flex flex-col gap-2">
          {/* Game Overview Extra Information Themes Title */}
          <span className="font-semibold text-gray-300">Temas</span>
          {/* Game Overview Extra Information Themes */}
          <span>{themes !== "" ? themes : "N/A"}</span>
        </section>
        {/* Game Overview Extra Information Genres Section */}
        <section className="flex flex-col gap-2">
          {/* Game Overview Extra Information Genres Title */}
          <span className="font-semibold text-gray-300">Géneros</span>
          {/* Game Overview Extra Information Genres */}
          <span>{genres !== "" ? genres : "N/A"}</span>
        </section>
        {/* Game Overview Extra Information Platforms Section */}
        <section className="flex flex-col gap-2">
          {/* Game Overview Extra Information Platforms Title */}
          <span className="font-semibold text-gray-300">Plataformas</span>
          {/* Game Overview Extra Information Platforms */}
          <span>{platforms}</span>
        </section>
      </div>
      {note && note !== null && (
        // Game Overview Note Section
        <section>
          {/* Game Overview Note Section Title */}
          <span className="font-semibold text-gray-300">Nota</span>
          {/* Game Overview Note Section Description */}
          <blockquote className="italic text-gray-200 bg-gray-800 border-l-4 border-l-primary p-4 mt-2">
            {note}
          </blockquote>
        </section>
      )}
      {/* Game Overview Trailer Section */}
      {trailer && (
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
