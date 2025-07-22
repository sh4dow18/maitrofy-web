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
  const TITLE = EXISTING_GAME?.name;
  // Returns Metadata Generated
  return {
    title: EXISTING_GAME ? TITLE : "No Encontrado",
    description: EXISTING_GAME
      ? `Aqui se pueden encontrar toda la información referente al backlog '${TITLE}' del usuario logueado`
      : "No Encontrado",
  };
}
// Backlog Layout Main Function
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
