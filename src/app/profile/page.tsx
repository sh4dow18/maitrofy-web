// Profile Page Requirements
import { Image } from "@/components";
import { Metadata } from "next";
// Profile Page Metadata
export const metadata: Metadata = {
  title: "Perfil",
  description: "Aquí se podrá ver toda la información del perfil del usuario",
};
// Profile Page Main Function
function ProfilePage() {
  // Profile Page Constants
  const USER = {
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
  };
  const INFORMATION_LIST = [
    { title: "Correo Electrónico", value: USER.email },
    { title: "Creado", value: USER.date },
    { title: "Rol", value: USER.role },
    { title: "Nivel", value: USER.level },
    { title: "Estado", value: USER.status },
    { title: "Juegos Registrados", value: USER.gamesCount },
    { title: "Juegos Completados", value: USER.completed },
    { title: "Platinos", value: USER.platinum },
    { title: "PseudoPlatinos", value: USER.pseudoPlatinum },
    { title: "Platinos Offline", value: USER.offlinePlatinum },
    { title: "PsicoPlatinos", value: USER.psicoPlatinum },
    { title: "Puntos Obtenidos", value: USER.points },
    { title: "Posición en Ranking", value: USER.ranking },
    { title: "Juego Preferido", value: USER.favoriteGame },
    { title: "Tema Preferido", value: USER.favoriteTheme },
    { title: "Género Preferido", value: USER.favoriteGenre },
    { title: "Plataforma Preferida", value: USER.favoritePlatform },
    { title: "Colección Preferida", value: USER.favoriteCollection },
    {
      title: "Desarrolladora Preferida",
      value: USER.favoriteDeveloper,
    },
    { title: "Modo de Juego Preferido", value: USER.favoriteGameMode },
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
            src={USER.backgroundImage || "/404.png"}
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
              src={USER.profileImage || "/profile.webp"}
              alt={`${USER.name} Profile Image`}
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
            {USER.name}
          </h1>
          {/* Profile Page Information Container */}
          <div className="flex flex-wrap gap-5 min-[600px]:gap-10 min-[477px]:items-center">
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
      </div>
    </div>
  );
}

export default ProfilePage;
