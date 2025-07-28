// Layout Stylesheets
import "./globals.css";
// Layout Requirements
import Link from "next/link";
import { Light, Nav } from "@/components";
import { FaGithub } from "react-icons/fa";
import { DiMitlicence } from "react-icons/di";
import { cloneElement } from "react";
// Layout Main Function
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root Layout Constants
  const LOGOS_LIST = [
    { href: "https://github.com/sh4dow18/miteve-web", icon: <FaGithub /> },
    { href: "https://opensource.org/license/mit", icon: <DiMitlicence /> },
  ];
  // Returns Layout
  return (
    // Layout Main Container
    <html lang="es" className="font-inter bg-gray-950">
      {/* Layout Body */}
      <body className="flex flex-col h-dvh">
        {/* Navigation in Header */}
        <header>
          <Nav />
        </header>
        {/* Main Content Container */}
        <main className="flex flex-1">
          {/* Light in Top Left */}
          <Light direction="tl" />
          {/* Main Content */}
          <div className="flex flex-col place-content-center w-full z-10 text-gray-400">
            {children}
          </div>
          {/* Light in Bottom Right */}
          <Light direction="br" />
        </main>
        {/* Informative Footer */}
        <footer className="text-center py-8 text-gray-200 sm:flex sm:place-content-between sm:items-center sm:px-8">
          {/* Logos Container */}
          <div className="flex gap-4 justify-center max-w-fit mx-auto mb-5 sm:order-3 sm:m-0">
            {LOGOS_LIST.map((logo, index) => (
              <Link key={index} href={logo.href} target="_blank">
                {cloneElement(logo.icon, {
                  className:
                    "w-6 h-6 filter brightness-100 hover:brightness-150",
                })}
              </Link>
            ))}
          </div>
          {/* Copyright Text */}
          <p className="text-xs sm:order-2 md:text-sm">
            ©{" "}
            <Link
              href="https://github.com/sh4dow18"
              target="_blank"
              className="hover:text-primary"
            >
              Ramsés Solano
            </Link>
            . Todos los Derechos Reservados.
          </p>
          {/* Last Update */}
          <p className="text-xs sm:order-1 md:text-sm">28 de Julio del 2025</p>
        </footer>
      </body>
    </html>
  );
}
