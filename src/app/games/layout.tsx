// Games Layout Requirements
import { Metadata } from "next";
// Games Layout Metadata
export const metadata: Metadata = {
  title: "Juegos",
  description: "Aquí se encuentran los juegos disponibles en Maitrofy",
};
// Games Layout Main Function
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
