// Backlog Layout Requirements
import { Metadata } from "next";
// Backlog Layout Metadata
export const metadata: Metadata = {
  title: "Mi Trayectoria",
  description: "Aquí se podrá ver toda la trayectoria de Juegos que tenga el usuario logueado",
};
// Backlog Layout Main Function
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
