// Set this component as a client component
"use client";
// Input Requirements
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, Ref, useState } from "react";
// Input Props
interface Props {
  label: string;
  placeholder: string;
  name: string;
  validation: "email" | "password" | "text" | "int" | "1to10";
  help?: string;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  optional?: boolean;
  reference?: Ref<HTMLInputElement>;
}
// Input Regular Expressions to use in Validations
const REGEX: Record<string, RegExp> = {
  // Only valid e-mails
  // Example: sh4dow18@miteve.com or example@example.com
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // Only Passwords
  // Example: Hola1234! or P@ssw0rd
  password: /^[a-zA-Z0-9]{8,}$/,
  // Only Readable Text
  // Example: Ramsés or Juan Tamarindo or Pepelefu
  text: /^[a-zA-Z0-9ÁÉÍÓÚÑáéíóúñ ]+$/,
  // Only Integer Numbers
  // Example: 8000 or 9502
  int: /^\d+$/,
  // Only Integer Numbers from 1 to 10
  // Example: 1 or 10
  "1to10": /^(10|[1-9])$/,
};
// Input Main Function
function Input({
  label,
  placeholder,
  name,
  help,
  validation,
  disabled,
  autoComplete,
  maxLength,
  optional,
  reference,
}: Props) {
  // Input Hooks
  const [state, SetState] = useState<"Valid" | "Neutral" | "Invalid">(
    "Neutral"
  );
  // Input on Change Function
  const OnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Event Value
    const VALUE = event.target.value;
    // If Value is Empty, set Neutral
    if (VALUE.length == 0) {
      SetState("Neutral");
    }
    // If is not empty, check if it is valid
    else {
      // If Value is Valid, set Valid
      if (REGEX[validation ? validation : name].test(VALUE)) {
        SetState("Valid");
        return;
      }
      // If Value is not Valid, set Invalid
      SetState("Invalid");
    }
  };
  // Returns Input Component
  return (
    // Input Container
    <div className="flex flex-col gap-1">
      {/* Input Label */}
      <label
        htmlFor={name}
        aria-disabled={disabled}
        className="font-medium text-white aria-disabled:text-gray-700"
      >
        {label}
      </label>
      {/* Input Content Container */}
      <div
        aria-disabled={disabled}
        className="flex place-content-between rounded-md outline-2 py-2 px-1 focus-within:outline-primary bg-gray-800 outline-gray-800 aria-disabled:bg-gray-900 aria-disabled:outline-gray-900 min-[344px]:px-3"
      >
        {/* Main Input */}
        <input
          ref={reference}
          id={name}
          name={name}
          type={validation === "password" ? "password" : "text"}
          placeholder={`Ejemplo: ${placeholder}`}
          onChange={OnChange}
          aria-invalid={state !== "Neutral" ? state === "Invalid" : undefined}
          disabled={disabled}
          autoComplete={autoComplete || "on"}
          maxLength={maxLength || undefined}
          required={optional === true ? false : true}
          className="w-full bg-transparent outline-hidden disabled:text-gray-600 text-white disabled:placeholder:text-gray-600"
        />
        {/* Input Validation Icon */}
        {state === "Neutral" ? (
          <div className="hidden min-[360px]:block min-[360px]:w-6 min-[360px]:h-6" />
        ) : state === "Valid" ? (
          <CheckIcon
            aria-disabled={disabled}
            className="hidden min-[360px]:block min-[360px]:w-6 aria-disabled:opacity-0"
          />
        ) : (
          <XMarkIcon
            aria-disabled={disabled}
            className="hidden min-[360px]:block min-[360px]:w-6 min-[360px]:fill-red-500 aria-disabled:opacity-0"
          />
        )}
      </div>
      {help !== undefined && (
        // Input Help Message
        <small
          aria-disabled={disabled}
          className={`aria-disabled:text-gray-600 ${
            state !== "Neutral"
              ? state === "Invalid"
                ? "text-red-500"
                : undefined
              : undefined
          }`}
        >
          {`${help}${optional === true ? ". Este Campo es OPCIONAL" : ""}`}
        </small>
      )}
    </div>
  );
}

export default Input;
