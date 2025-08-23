// Login Layout Requirements
import { Metadata } from "next";
// Login Layout Metadata
export const metadata: Metadata = {
  title: "Inicio de Sesión",
  description: "Aquí se podrá iniciar la sesión",
};
// Login Layout Main Function
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}