// Set this component as a client component
"use client";
// Add Game Log Button Requirements
import { PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Modal from "./modal";
import { AddUserGameLog } from "@/lib/users";
import { GetJWT, RemoveJWT } from "@/lib/session";
import { CheckAuth } from "@/lib/utils";
// Add Game Log Button Props
interface Props {
  game: {
    slug: string;
    name: string;
  };
}
// Add Game Log Button Main Function
function AddGameLogButton({ game }: Props) {
  // Add Game Log Button Hooks
  const [disabled, SetDisabled] = useState<boolean>(false);
  const [modalSettings, SetModalSettings] = useState<{
    open: boolean;
    status: "success" | "error" | "loading";
    message: string;
  }>({
    open: false,
    status: "loading",
    message: "Cargando...",
  });
  // Form Main Use Effect Hook to check exist JWT and if it is valid
  useEffect(() => {
    const CheckJWT = async () => {
      const JWT = GetJWT();
      if (JWT !== undefined) {
        // Check if it is a Valid JWT with API
        const RESPONSE = await CheckAuth();
        // If the response is a Error Response, remove JWT and set it disable
        if ("status" in RESPONSE) {
          RemoveJWT();
          SetDisabled(true);
          return;
        }
        // If the response is ok, set it enable
        SetDisabled(false);
        return;
      }
      // If has no JWT, set it disable
      SetDisabled(true);
    };
    CheckJWT();
  }, []);
  // On Click Button Function
  const OnClick = async () => {
    // Open Loading Modal
    SetModalSettings({
      ...modalSettings,
      open: true,
      message: "Cargando...",
    });
    // Try to insert a new game log for the user
    const RESPONSE = await AddUserGameLog(game.slug);
    // Check if the Response is OK
    const OK = !("status" in RESPONSE);
    // Set modal to success or error, depending on the response
    SetModalSettings({
      open: true,
      status: OK === true ? "success" : "error",
      message:
        OK === true
          ? `Se ha agregado '${game.name}' con Exito`
          : RESPONSE.message,
    });
  };
  // Return Add Game log Button Component
  return (
    <>
      {/* Add Game Log Main Button */}
      <button
        className="group relative flex gap-1 items-center justify-center bg-gray-300 text-xl py-2 px-5 rounded-sm text-gray-900 font-semibold w-full transition hover:bg-gray-50 hover:cursor-pointer hover:scale-105 disabled:bg-gray-400 disabled:hover:scale-100"
        onClick={OnClick}
        disabled={disabled === true}
      >
        {/* Add Game Log Main Button Information */}
        <PlusIcon className="w-6 h-6" />
        <span>Agregar</span>
        {/* Add Game Log Main Button Tooltip */}
        {disabled === true && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 text-sm rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition">
            Inicia Sesión para usar
          </span>
        )}
      </button>
      {/* Add Game Log Main Button Modal */}
      <Modal
        open={modalSettings.open}
        status={modalSettings.status}
        message={modalSettings.message}
        Close={() => {
          SetModalSettings({
            open: false,
            status: "loading",
            message: "Cargando...",
          });
          if (modalSettings.status === "success") {
            window.location.href = "/backlog";
          }
        }}
      />
    </>
  );
}

export default AddGameLogButton;
