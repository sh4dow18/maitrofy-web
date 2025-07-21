"use client";
// Profile Page Requirements
import { Image } from "@/components";
import { GetJWT, RemoveJWT } from "@/lib/session";
import { User } from "@/lib/types";
import { GetUser } from "@/lib/users";
import { useEffect, useState } from "react";
// Profile Page Main Function
function ProfilePage() {
  // Profile Page Hooks
  const [user, SetUser] = useState<User>({
    backgroundImage: null,
    profileImage: null,
    name: "Usuario No Encontrado",
    email: "example@example.com",
    date: "--/--/----",
    role: "No Encontrado",
    level: "No Encontrado",
    status: "Estado no Encontrado",
    gamesCount: "-",
    completed: "-",
    platinum: "-",
    pseudoPlatinum: "-",
    offlinePlatinum: "-",
    psicoPlatinum: "-",
    points: "-",
    ranking: "#-",
    favoriteGame: "Juego No Encontrado",
    favoriteTheme: "Tema No Encontrada",
    favoriteGenre: "Género No Encontrada",
    favoritePlatform: "Plataforma No Encontrada",
    favoriteCollection: "Colección No Encontrada",
    favoriteDeveloper: "Desarrolladora No Encontrada",
    favoriteGameMode: "Modo de Juego No Encontrado",
  });
  // Execute this useEffect when page is loading
  useEffect(() => {
    const JWT = GetJWT() ?? "";
    if (JWT === undefined) {
      return;
    }
    const USER = GetUser(JWT);
    if (USER === null) {
      return;
    }
    SetUser(USER);
  }, []);
  // Profile Page Constants
  const INFORMATION_LIST = [
    { title: "Correo Electrónico", value: user.email },
    { title: "Creado", value: user.date },
    { title: "Rol", value: user.role },
    { title: "Nivel", value: user.level },
    { title: "Estado", value: user.status },
    { title: "Juegos Registrados", value: user.gamesCount },
    { title: "Juegos Completados", value: user.completed },
    { title: "Platinos", value: user.platinum },
    { title: "PseudoPlatinos", value: user.pseudoPlatinum },
    { title: "Platinos Offline", value: user.offlinePlatinum },
    { title: "PsicoPlatinos", value: user.psicoPlatinum },
    { title: "Puntos Obtenidos", value: user.points },
    { title: "Posición en Ranking", value: user.ranking },
    { title: "Juego Preferido", value: user.favoriteGame },
    { title: "Tema Preferido", value: user.favoriteTheme },
    { title: "Género Preferido", value: user.favoriteGenre },
    { title: "Plataforma Preferida", value: user.favoritePlatform },
    { title: "Colección Preferida", value: user.favoriteCollection },
    {
      title: "Desarrolladora Preferida",
      value: user.favoriteDeveloper,
    },
    { title: "Modo de Juego Preferido", value: user.favoriteGameMode },
  ];
  // Returns Profile Page
  return (
    <div className="flex flex-col gap-3 p-10 max-w-4xl min-[897px]:mx-auto">
      {/* Profile Page Container */}
      <div className="flex flex-col gap-5">
        {/* Profile Page Images Container */}
        <div className="min-[600px]:relative">
          {/* Profile Page Background Image */}
          <Image
            src={user.backgroundImage || "/404.png"}
            alt="Background Image"
            skeleton="background"
            fill
            className="hidden object-cover object-center -z-10 mask-image rounded-t-sm min-[600px]:block"
            priority
          />
          {/* Profile Page images Second Container */}
          <div className="flex flex-col gap-5 min-[600px]:flex-row min-[600px]:place-content-between min-[600px]:pt-30 min-[600px]:px-3 min-[600px]:pb-3">
            {/* Profile Page Image Cover */}
            <Image
              src={user.profileImage || "/profile.webp"}
              alt={`${user.name} Profile Image`}
              skeleton="profile"
              width={600}
              height={600}
              priority
              className="rounded-lg w-full min-[600px]:w-44 min-[600px]:shadow-sm shadow-gray-700"
            />
          </div>
        </div>
        {/* Profile Page Description Container */}
        <section className="flex flex-col gap-3">
          {/* Profile Page Description Main Title */}
          <h1 className="text-4xl text-center leading-14 font-bold text-gray-300 min-[351px]:text-5xl min-[600px]:text-4xl min-[600px]:text-left min-[600px]:leading-12">
            {user.name}
          </h1>
          {/* Profile Page Information Container */}
          <div className="flex flex-wrap gap-5 min-[600px]:gap-7 min-[477px]:items-center">
            {INFORMATION_LIST.map((info, index) => (
              // Profile Page Information Section
              <section key={index} className="flex flex-col gap-2">
                {/* Profile Page Information Title */}
                <span className="font-semibold text-gray-300">
                  {info.title}
                </span>
                {/* Profile Page Information Value */}
                <span>{info.value}</span>
              </section>
            ))}
          </div>
        </section>
        {/* Profile Page CTA Section */}
        <section className="flex flex-col gap-5 mt-5 min-[400px]:grid min-[400px]:grid-cols-2 min-[400px]:gap-5">
          {/* Profile Page Log out Button */}
          <button
            className="bg-gray-300 text-black py-2 rounded-md cursor-pointer font-semibold hover:bg-gray-50"
            onClick={() => {
              RemoveJWT();
              location.reload();
            }}
          >
            Cerrar Sesión
          </button>
          {/* Profile Page Delete Account Button */}
          <button
            className="bg-gray-500 text-black py-2 rounded-md font-semibold cursor-not-allowed"
            disabled
          >
            Eliminar Cuenta
          </button>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
