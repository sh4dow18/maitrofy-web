// Backlog Layout Requirements
import { FindGameBySlug } from "@/lib/games";
import { Metadata } from "next";
// Backlog Layout Props
interface Props {
  params: Promise<{ slug: string }>;
}
// Backlog Layout Metadata
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
// Backlog Layout Main Function
export default function SpecificBacklogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
