// Set this component as a client component
"use client";
// Date Input Requirements
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, useState } from "react";
// Date Input Props
interface Props {
  label: string;
  name: string;
  help?: string;
  value?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  optional?: boolean;
}
// Date Input Main Function
function DateInput({
  label,
  name,
  help,
  value,
  disabled,
  minDate,
  maxDate,
  optional,
}: Props) {
  // Date Input Hooks
  const [state, SetState] = useState<"Valid" | "Neutral">("Neutral");
  // Function that allows to Get the Current Date with YYYY-MM-DD format
  const DateNow = () => {
    // Get Current Date
    const TDOAY = new Date();
    // Get Current Year
    const YEAR = TDOAY.getFullYear();
    // Get Current Month with 2 digits
    const MONTH = String(TDOAY.getMonth() + 1).padStart(2, "0");
    // Get Current Day with 2 digits
    const DAY = String(TDOAY.getDate()).padStart(2, "0");
    // Return date as a string with YYYY-MM-DD format
    return `${YEAR}-${MONTH}-${DAY}`;
  };
  // Date Input On Change
  const OnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const VALUE = event.target.value;
    if (VALUE !== "" && VALUE !== undefined && VALUE !== null) {
      SetState("Valid");
    }
  };
  // Returns Input Component
  return (
    // Date Input Container
    <div className="flex flex-col gap-1">
      {/* Date Input Label */}
      <label
        htmlFor={name}
        aria-disabled={disabled}
        className="font-medium text-white aria-disabled:text-gray-700"
      >
        {label}
      </label>
      {/* Date Input Content Container */}
      <div
        aria-disabled={disabled}
        className="flex place-content-between rounded-md outline-2 py-2 px-1 focus-within:outline-primary bg-gray-800 outline-gray-800 aria-disabled:bg-gray-900 aria-disabled:outline-gray-900 min-[344px]:px-3"
      >
        {/* Date Main Input */}
        <input
          id={name}
          name={name}
          type="date"
          aria-invalid={state !== "Neutral" ? false : undefined}
          disabled={disabled}
          min={minDate === undefined ? "1970-01-01" : minDate}
          max={maxDate === undefined ? DateNow() : maxDate}
          required={optional === true ? false : true}
          value={value}
          className="w-full bg-transparent outline-hidden disabled:text-gray-600 text-white disabled:placeholder:text-gray-600"
          onKeyUp={(e) => e.preventDefault()}
          onKeyDown={(e) => e.preventDefault()}
          onChange={OnChange}
        />
        {/* Date Input Validation Icon */}
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
        // Date Input Help Message
        <small aria-disabled={disabled} className="aria-disabled:text-gray-600">
          {`${help}${optional === true ? ". Este Campo es OPCIONAL" : ""}`}
        </small>
      )}
    </div>
  );
}

export default DateInput;
