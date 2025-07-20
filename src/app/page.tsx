// Home Page Requirements
import MainLogo from "@/components/main-logo";
import {
  ArrowRightIcon,
  ComputerDesktopIcon,
  ScaleIcon,
} from "@heroicons/react/16/solid";
import { Metadata } from "next";
import Link from "next/link";
import { cloneElement, ReactElement } from "react";
import { BsBrowserChrome } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
// Home Page Metadata
export const metadata: Metadata = {
  title: "Maitrofy",
  description:
    "Maitrofy es una herramienta web que busca ayudar a los jugadores a tener un mayor control y visión sobre su experiencia personal con los videojuegos, convirtiendo su historial de juego en un espacio organizado y significativo.",
};
export default function Home() {
  // Home Page Constants
  const BENEFITS_LIST = [
    {
      image: <ComputerDesktopIcon />,
      title: "Toda tu experiencia en un solo lugar",
      description:
        "Ideal para mantener un registro claro y ordenado de los juegos que has disfrutado a lo largo del tiempo.",
    },
    {
      image: <GiConsoleController />,
      title: "Pensado para todo tipo de jugadores",
      description:
        "Desde jugadores casuales hasta coleccionistas o completistas, se adapta a cualquier estilo de juego.",
    },
    {
      image: <BsBrowserChrome />,
      title: "Interfaz limpia y moderna",
      description:
        "Diseñado con tecnologías web modernas, ofrece una experiencia intuitiva, clara y enfocada en lo esencial.",
    },
    {
      image: <ScaleIcon />,
      title: "Ligero y accesible",
      description:
        "Disponible desde cualquier navegador, sin configuraciones complicadas ni necesidad de servicios externos.",
    },
  ];
  // Returns Home Page
  return (
    <div className="flex flex-col gap-14 my-5 px-7 max-w-5xl mx-auto">
      <section className="flex flex-col items-center gap-6">
        {/* Home Page Main Title */}
        <h1 className="hidden">Maitrofy</h1>
        {/* Home Page Main Logo */}
        <MainLogo
          width={250}
          height={250}
          className="h-auto min-[375px]:w-[20rem] min-[560px]:w-[30rem]"
        />
        {/* Home Page Main Description */}
        <p className="text-center leading-7">
          Maitrofy es una herramienta web que busca ayudar a los jugadores a
          tener un mayor control y visión sobre su experiencia personal con los
          videojuegos, convirtiendo su historial de juego en un espacio
          organizado y significativo.
        </p>
        {/* Home Page Main CTA Section */}
        <div className="flex flex-col gap-6 justify-center min-[345px]:flex-row min-[345px]:flex-wrap">
          {/* Begins Link */}
          <Link
            href="/games"
            className="bg-primary text-white px-4 py-2 font-medium rounded-md text-center hover:bg-primary-light"
          >
            Empezar
          </Link>
          {/* How it works Link */}
          <Link
            href="/how-it-works"
            className="bg-gray-600 text-white px-4 py-2 rounded-md text-center hover:bg-gray-500"
          >
            ¿Como Funciona?
          </Link>
          {/* View Docs Link Container */}
          <div className="flex gap-1 items-center hover:text-white">
            <Link
              href="https://github.com/sh4dow18/maitrofy-web"
              target="_blank"
              className="font-bold"
            >
              Ver Documentación
            </Link>
            <ArrowRightIcon className="w-4" />
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section>
        {/* Benefits Information Container */}
        <div className="mb-10 md:text-center md:mx-auto">
          {/* Mini Title */}
          <span className="font-semibold text-primary mt-1">
            Lleva el control de tu experiencia como jugador
          </span>
          {/* Benefits Title */}
          <h2 className="text-gray-300 text-3xl font-bold mb-5 min-[361px]:text-4xl md:text-5xl">
            La forma más sencilla de gestionar tu historial de videojuegos
          </h2>
          {/* Benefits Description */}
          <p className="leading-8">
            Creado por un programador con diplomado en aplicaciones
            informáticas, Maitrofy convierte la experiencia de jugar en algo más
            significativo, al ofrecer una forma organizada de visualizar tu
            trayectoria gamer. Todo desde una plataforma accesible desde
            cualquier dispositivo con conexión a Internet.
          </p>
        </div>
        {/* Benefits "Benefits" Container */}
        <div className="flex flex-col gap-6 mt-5 min-[779px]:flex-row min-[779px]:flex-wrap min-[779px]:justify-center min-[779px]:gap-5">
          {BENEFITS_LIST.map((benefit, index) => (
            <section
              key={index}
              className="flex gap-3 min-[779px]:max-w-xs lg:max-w-sm xl:max-w-md"
            >
              <div>
                {cloneElement(
                  benefit.image as ReactElement<{ className?: string }>,
                  {
                    className: "w-10 h-10 p-2 bg-primary rounded-lg fill-gray-200",
                  }
                )}
              </div>
              <section className="flex flex-col gap-2">
                <span className="font-semibold text-gray-300">
                  {benefit.title}
                </span>
                <p className="leading-7">{benefit.description}</p>
              </section>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
