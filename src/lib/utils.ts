import { API } from "./admin";
import { GetJWT } from "./session";
import { ErrorResponse } from "./types";
// Function that allow to check if the user has a valid JWT
export async function CheckAuth(): Promise<object | ErrorResponse> {
  const RESPONSE = await fetch(`${API}/utils/auth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GetJWT()}`,
    },
  });
  // If Response is not 200, return it as Error Response
  if (RESPONSE.ok == false) {
    return await RESPONSE.json() as ErrorResponse;
  }
  // If Response is 200, return it an empty object
  return {};
}
