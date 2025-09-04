// Set this component as a client component
"use client";
// Admin Button Requirements
import { useState } from "react";
import Modal from "./modal";
// Admin Button Props
interface Props {
  name: string;
  description: string;
  buttonName: string;
  OnClick: () => Promise<Response>;
  successMessage: string;
  loadingMessage?: string;
  wait?: {
    time: string;
    reason: string;
  };
}
// Admin Button Main Function
function AdminButton({
  name,
  description,
  buttonName,
  OnClick,
  successMessage,
  loadingMessage,
  wait,
}: Props) {
  // Admin Button Hooks
  const [modalSettings, SetModalSettings] = useState<{
    open: boolean;
    status: "success" | "error" | "loading";
    message: string;
  }>({
    open: false,
    status: "loading",
    message: "Cargando...",
  });
  // Function that allows to execute on click async function sent with Modal Component
  const ButtonOnClick = async () => {
    // Open Loading Modal
    SetModalSettings({
      ...modalSettings,
      open: true,
      message:
        loadingMessage !== undefined
          ? loadingMessage
          : wait !== undefined
          ? `Tiempo de Espera Aproximado de ${wait.time} debido a ${wait.reason} (Si se posee un buen internet)`
          : "Cargando...",
    });
    // Try to execute the async On Click
    const RESPONSE = await OnClick();
    // Check if the Response is OK
    const OK = RESPONSE.ok;
    // Set modal to success or error, depending on the response
    SetModalSettings({
      open: true,
      status: OK === true ? "success" : "error",
      message: OK === true ? successMessage : (await RESPONSE.json()).message,
    });
  };
  // Return Admin Button Component
  return (
    <>
      {/* Admin Button Main Container */}
      <div className="flex flex-col gap-5 place-items-center text-center bg-gray-800 rounded-lg p-6 md:flex-row md:place-content-between">
        {/* Admin Button Main Information Container */}
        <div className="flex flex-col gap-2 text-left">
          {/* Admin Button Main Information Title */}
          <span className="font-semibold text-xl text-gray-200">{name}</span>
          {/* Admin Button Main Information Description */}
          <span className="text-gray-300 font-medium">{description}</span>
          {/* Admin Button Main Approximate Waiting Time Message */}
          {wait !== undefined && (
            <span>{`Tiempo de Espera Aproximado de ${wait.time} debido a ${wait.reason} (Si se posee un buen internet)`}</span>
          )}
        </div>
        {/* Admin Button Main Button */}
        <button
          onClick={ButtonOnClick}
          className="w-full px-4 py-2 bg-primary font-bold text-white rounded-lg transition hover:bg-primary-light hover:cursor-pointer hover:scale-105 md:w-fit"
        >
          {buttonName}
        </button>
      </div>
      {/* Admin Button Modal */}
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
        }}
      />
    </>
  );
}

export default AdminButton;
