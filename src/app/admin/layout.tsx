// Admin Layout Requirements
import { Metadata } from "next";
// Admin Layout Metadata
export const metadata: Metadata = {
  title: "Administración",
  description: "Aquí se podrá acceder a las funciones administrativas de Maitrofy",
};
// Admin Layout Main Function
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
