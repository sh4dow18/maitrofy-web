// Profile Layout Requirements
import { Metadata } from "next";
// Profile Layout Metadata
export const metadata: Metadata = {
  title: "Perfil",
  description: "Aquí se podrá ver toda la información del perfil del usuario",
};
// Profile Layout Main Function
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
