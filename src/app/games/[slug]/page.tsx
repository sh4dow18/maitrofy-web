// Game Content Page Requirements
import { GameOverview, NotFound, Slider } from "@/components";
import { FindGameBySlug, FindRecomendationsFromGame } from "@/lib/games";
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
  const TITLE =
    "status" in EXISTING_GAME ? "No Encontrado" : EXISTING_GAME.name;
  // Returns Metadata Generated
  return {
    title: TITLE,
    description:
      TITLE !== "No Encontrado"
        ? `Aqui se pueden encontrar toda la información referente al juego '${TITLE}'`
        : TITLE,
  };
}
// Game Content Page Main Function
async function GameContentPage({ params }: Props) {
  // Game Content Page Constants
  const { slug } = await params;
  // Game Content Page Constants
  const CONTENT = await FindGameBySlug(slug);
  const RECOMENDATIONS_LIST = await FindRecomendationsFromGame(slug);
  // Returns Game Content Page
  return !("status" in CONTENT) ? (
    // Game Content Main Container
    <div className="flex flex-col gap-3 p-10 max-w-4xl min-[897px]:mx-auto">
      <GameOverview
        title={CONTENT.name}
        cover={CONTENT.cover}
        background={CONTENT.background}
        date={CONTENT.year}
        themes={CONTENT.themes}
        genres={CONTENT.genres}
        platforms={CONTENT.platforms}
        overview={CONTENT.summary}
        rating={CONTENT.rating}
        classification={CONTENT.classification}
        developer={CONTENT.developer}
        gameMode={CONTENT.gameMode}
        trailer={CONTENT.video}
      />
      {!("status" in RECOMENDATIONS_LIST) && RECOMENDATIONS_LIST.length > 0 && (
        <Slider title="Recomendaciones" contentList={RECOMENDATIONS_LIST} />
      )}
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
