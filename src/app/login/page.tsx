// Set this page as a client page
"use client";
// Login Page Requirements
import { Form, Input } from "@/components";
import { API } from "@/lib/admin";
import { SetJWT } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
// Login Page Main Function
function LoginPage() {
  // Function that allows to Get JWT from User
  const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const FORM = event.target as HTMLFormElement;
    const BODY = {
      email: FORM.email.value,
      password: FORM.password.value,
    };
    const RESPONSE = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(BODY),
    });
    // Get Data from Response
    const DATA = await RESPONSE.clone();
    // Get JWT from Authorization Header in Response
    const JWT = RESPONSE.headers.get("Authorization");
    // If Data has status 200 and JWT is not null, set the JWT as Cookie
    if (DATA.ok == true && JWT !== null) {
      SetJWT(JWT.replace("Bearer ", ""));
    }
    // Return the response to Form
    return RESPONSE;
  };
  // Returns Login Page
  return (
    // Login Container
    <div className="flex flex-1 flex-col place-content-center">
      <div className="flex flex-col place-items-center gap-10 my-5 px-7 w-full mx-auto min-[512px]:w-lg">
        {/* Login Container Header */}
        <div className="flex flex-col gap-4">
          <Image
            src="/favicon.svg"
            alt="Logo Favicon"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h1 className="text-3xl leading-none font-bold text-gray-300 text-center">
            Iniciar Sesión
          </h1>
        </div>
        {/* Login Container Form */}
        <Form
          submitButton="Iniciar Sesión"
          OnSubmit={OnSubmit}
          messages={{
            loading: "Iniciando Sesión",
            success: "Se ha Iniciado la Sesión",
            error: "El Correo Electrónico o la Contraseña son Inválidos",
          }}
          AfterSubmit={() => {
            location.reload();
          }}
        >
          {/* Email Input */}
          <Input
            label="Correo Electrónico"
            name="email"
            validation="email"
            placeholder="sh4dow18@maitrofy.com"
            help="El Correo Electrónico asociado a su cuenta"
          />
          {/* Password Input */}
          <Input
            label="Contraseña"
            name="password"
            validation="password"
            placeholder="Contraseña"
            help="La Contraseña asociada a su cuenta"
          />
        </Form>
        {/* Login Container Footer */}
        <span className="text-center">
          ¿No tiene cuenta?{" "}
          <Link href="#" className="text-primary-light hover:text-primary">
            Regístrese
          </Link>
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
