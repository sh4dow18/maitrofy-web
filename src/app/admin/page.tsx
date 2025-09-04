// Set this page as a client page
"use client";
// Admin Page Requirements
import { AdminButton } from "@/components";
import { API } from "@/lib/admin";
import { GetJWT, RemoveJWT } from "@/lib/session";
import { CheckAuth } from "@/lib/utils";
import { useEffect, useState } from "react";
// Admin Page Main Page
function AdminPage() {
  // Admin Page Constants
  const LOCAL_NAV_OPTIONS_LIST = [
    {
      key: "themes",
      value: "Temas",
    },
    {
      key: "genres",
      value: "Géneros",
    },
    {
      key: "platforms",
      value: "Plataformas",
    },
    {
      key: "games",
      value: "Juegos",
    },
    {
      key: "achievements",
      value: "Logros",
    },
    {
      key: "privileges",
      value: "Privilegios",
    },
    {
      key: "roles",
      value: "Roles",
    },
  ];
  // Admin Page Hooks
  const [submenuActive, SetSubmenuActive] = useState(LOCAL_NAV_OPTIONS_LIST[0]);
  // Main Use Effect Hook to check exist JWT and if it is valid
  useEffect(() => {
    const CheckJWT = async () => {
      // Check if it is a Valid JWT with API
      const RESPONSE = await CheckAuth();
      // If Status exists in Response, that is Error Response, so, return to login and remove JWT
      if ("status" in RESPONSE) {
        RemoveJWT();
        window.location.href = "/login";
        return;
      }
    };
    CheckJWT();
  }, []);
  // Function that allow to insert all themes in API
  const InsertAllThemesOnClick = async () => {
    return await fetch(`${API}/themes/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetJWT()}`,
      },
    });
  };
  // Function that allow to insert all genres in API
  const InsertAllGenresOnClick = async () => {
    return await fetch(`${API}/genres/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetJWT()}`,
      },
    });
  };
  // Function that allow to insert all platforms in API
  const InsertAllPlatformsOnClick = async () => {
    return await fetch(`${API}/platforms/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetJWT()}`,
      },
    });
  };
  // Function that allow to insert all games in API
  const InsertAllGamesOnClick = async () => {
    return await fetch(`${API}/games/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetJWT()}`,
      },
    });
  };
  // Function that allow to insert all achievements in API
  const InsertAllAchievementsOnClick = async () => {
    return await fetch(`${API}/achievements/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetJWT()}`,
      },
    });
  };
  // Function that allow to insert all privileges in API
  const InsertAllPrivilegesOnClick = async () => {
    return await fetch(`${API}/privileges/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetJWT()}`,
      },
    });
  };
  // Function that allow to insert all roles in API
  const InsertAllRolesOnClick = async () => {
    return await fetch(`${API}/roles/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetJWT()}`,
      },
    });
  };
  // Return Admin Page
  return (
    // Admin Page Main Container
    <div className="flex flex-1 mask-image">
      {/* Admin Page Sidebar Container (Desktop) */}
      <aside className="hidden min-[580px]:flex w-64 bg-gray-900 text-white flex-col p-4">
        {/* Admin Page Sidebar Title */}
        <h1 className="text-2xl font-bold mb-6">Administración</h1>
        {/* Admin Page Sidebar Nav */}
        <nav className="flex flex-col gap-2">
          {LOCAL_NAV_OPTIONS_LIST.map((item) => (
            <button
              key={item.key}
              onClick={() => SetSubmenuActive(item)}
              className={`text-left px-4 py-2 rounded-lg transition cursor-pointer ${
                submenuActive.key === item.key
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.value}
            </button>
          ))}
        </nav>
      </aside>
      {/* Admin Page Main Info Container */}
      <section className="flex flex-col gap-5 w-full p-3">
        {/* Admin Page Dropdown Menu (Mobile)*/}
        <select
          id="submenus"
          onChange={(event) =>
            SetSubmenuActive(
              LOCAL_NAV_OPTIONS_LIST.find(
                (option) => option.key === event.target.value
              ) ?? LOCAL_NAV_OPTIONS_LIST[0]
            )
          }
          className="w-full bg-gray-800 text-white p-2 rounded-lg min-[580px]:hidden"
        >
          {LOCAL_NAV_OPTIONS_LIST.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        {/* Admin Page Info Container */}
        <div className="min-[580px]:overflow-y-auto">
          {/* Admin Page Themes Section */}
          {submenuActive.key === "themes" && (
            <AdminButton
              name="Insertar Temas"
              description="Insertar Información Actualizada de Todos los Temas del Sistema"
              buttonName="Agregar Temas"
              OnClick={InsertAllThemesOnClick}
              successMessage="Se han agregado todos los logros en el sistema"
              wait={{
                time: "10 segundos",
                reason: "Traducción de Nombres",
              }}
            />
          )}
          {/* Admin Page Genres Section */}
          {submenuActive.key === "genres" && (
            <AdminButton
              name="Insertar Géneros"
              description="Insertar Información Actualizada de Todos los Géneros del Sistema"
              buttonName="Agregar Géneros"
              OnClick={InsertAllGenresOnClick}
              successMessage="Se han agregado todos los logros en el sistema"
              wait={{
                time: "10 segundos",
                reason: "Traducción de Nombres",
              }}
            />
          )}
          {/* Admin Page Platforms Section */}
          {submenuActive.key === "platforms" && (
            <AdminButton
              name="Insertar Plataformas"
              description="Insertar Información Actualizada de Todos las Plataformas del Sistema"
              buttonName="Agregar Plataformas"
              OnClick={InsertAllPlatformsOnClick}
              successMessage="Se han agregado todos los logros en el sistema"
            />
          )}
          {/* Admin Page Games Section */}
          {submenuActive.key === "games" && (
            <AdminButton
              name="Insertar Juegos"
              description="Insertar Información Actualizada de Todos los Juegos del Sistema"
              buttonName="Agregar Juegos"
              OnClick={InsertAllGamesOnClick}
              successMessage="Se han agregado todos los logros en el sistema"
              loadingMessage="Tiempo de espera aproximado de 45 minutos por traducción de los nombres (Si se posee un buen internet)"
              wait={{
                time: "45 minutos",
                reason: "Traducción de Descripciones",
              }}
            />
          )}
          {/* Admin Page Achievement Section */}
          {submenuActive.key === "achievements" && (
            <AdminButton
              name="Insertar Logros"
              description="Insertar Información Actualizada de Todos los Logros del Sistema"
              buttonName="Agregar Logros"
              OnClick={InsertAllAchievementsOnClick}
              successMessage="Se han agregado todos los logros en el sistema"
            />
          )}
          {/* Admin Page Privileges Section */}
          {submenuActive.key === "privileges" && (
            <AdminButton
              name="Insertar Privilegios"
              description="Insertar Información Actualizada de Todos los Privilegios del Sistema"
              buttonName="Agregar Privilegios"
              OnClick={InsertAllPrivilegesOnClick}
              successMessage="Se han agregado todos los logros en el sistema"
            />
          )}
          {/* Admin Page Roles Section */}
          {submenuActive.key === "roles" && (
            <AdminButton
              name="Insertar Roles"
              description="Insertar Información Actualizada de Todos los Roles del Sistema"
              buttonName="Agregar Roles"
              OnClick={InsertAllRolesOnClick}
              successMessage="Se han agregado todos los logros en el sistema"
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
