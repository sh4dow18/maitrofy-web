// Manifest Requirements
import type { MetadataRoute } from "next";
// Manifest Main Function
export default function manifest(): MetadataRoute.Manifest {
  // Returns Manifest JSON File
  return {
    name: "Maitrofy",
    short_name: "Maitrofy",
    description:
      "Maitrofy es una herramienta web que busca ayudar a los jugadores a tener un mayor control y visión sobre su experiencia personal con los videojuegos, convirtiendo su historial de juego en un espacio organizado y significativo.",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
