// Game Content Page Requirements
import { GameOverview, NotFound } from "@/components";
import {
  FindGameBySlug,
  FindGenresFromGame,
  FindPlatformsFromGame,
  FindThemesFromGame,
} from "@/lib/games";
import { Metadata } from "next";
// Game Content Page  Props
interface Props {
  params: Promise<{ slug: string }>;
}
// Generate Metadata Function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Generate Metadata Main Params
  const { slug } = await params;
  // Generate Metadata Constants
  const EXISTING_GAME = await FindGameBySlug(slug);
  const TITLE = EXISTING_GAME?.name;
  // Returns Metadata Generated
  return {
    title: EXISTING_GAME ? TITLE : "No Encontrado",
    description: EXISTING_GAME
      ? `Aqui se pueden encontrar toda la información referente a la película '${TITLE}'`
      : "No Encontrado",
  };
}
// Game Content Page Main Function
async function GameContentPage({ params }: Props) {
  // Game Content Page Constants
  const { slug } = await params;
  // Game Content Page Constants
  const CONTENT = await FindGameBySlug(slug);
  // Returns Game Content Page
  return CONTENT !== undefined ? ( // Game Content Main Container
    <div className="flex flex-col gap-3 p-10 max-w-4xl min-[897px]:mx-auto">
      <GameOverview
        title={CONTENT.name}
        cover={CONTENT.cover}
        background={CONTENT.background}
        date={CONTENT.year}
        themes={FindThemesFromGame(CONTENT.genres)}
        genres={FindGenresFromGame(CONTENT.genres)}
        platforms={FindPlatformsFromGame(CONTENT.platforms)}
        overview={CONTENT.summary}
        rating={CONTENT.rating}
        classification={CONTENT.classification}
        trailer={CONTENT.video}
        note={null}
      />
    </div>
  ) : (
    <NotFound
      backTo={{
        name: "Juegos",
        href: "/games",
      }}
    />
  );
}

export default GameContentPage;
