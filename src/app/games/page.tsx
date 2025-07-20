// Games Page Requirements
import { Image } from "@/components";
import { FindTop50Games } from "@/lib/games";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Metadata } from "next";
import Link from "next/link";
// Games Page Metadata
export const metadata: Metadata = {
  title: "Juegos",
  description: "Aquí se encuentran los juegos disponibles en Maitrofy",
};
// Games Page Main Function
function GamesPage() {
  // Games Page Contants
  const GAMES_LIST = FindTop50Games();
  // Returns Games Page
  return (
    // Games Page Main Container
    <div className="flex flex-col gap-6 px-7 py-7 lg:px-10">
      {/* Games Page Utilities Container */}
      <div className="flex place-content-between gap-3 min-[500px]:items-center">
        {/* Games Page Utilities Title */}
        <h1 className="text-4xl leading-none font-bold text-gray-300 min-[351px]:text-5xl">
          Top 100
        </h1>
        {/* Games Page Utilities CTA Container */}
        <div className="flex items-center gap-5">
          {/* Games Page Utilities CTA Search Button */}
          <Link
            href="/search"
            className="flex items-center gap-1 bg-gray-800 p-2 rounded-md cursor-pointer hover:bg-gray-700"
          >
            <MagnifyingGlassIcon className="w-5 h-5 md:w-7 md:h-7" />
            <span className="text-gray-300 md:text-lg">Buscar</span>
          </Link>
        </div>
      </div>
      {/* Games Page Games Container */}
      <div className="flex flex-wrap gap-3 place-content-center">
        {GAMES_LIST.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="rounded-md w-[30%] min-[560px]:w-40"
          >
            <Image
              src={game.cover}
              alt={`${game.slug} Cover`}
              skeleton="cover"
              width={180}
              height={280}
              priority
              className="rounded-md transition hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
