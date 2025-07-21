// Session Requirements
import Cookies from "js-cookie";
// Session Types
interface CookieConfig {
  sameSite: "Strict" | "None";
  secure: boolean;
}
// Session Constants
const COOKIES_CONFIGURATION: CookieConfig = {
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
};
// Set JWT Function
export function SetJWT(jwt: string) {
  Cookies.set("JWT", jwt, COOKIES_CONFIGURATION);
}
// Get JWT Function
export function GetJWT() {
  return Cookies.get("JWT");
}
// Remove JWT Function
export function RemoveJWT() {
  Cookies.remove("JWT");
}
