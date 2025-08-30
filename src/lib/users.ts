// User Library Requirements
import { API } from "./admin";
import { GetJWT } from "./session";
import {
  ErrorResponse,
  GameLogResponse,
  MinimalGameLogResponse,
  UserResponse,
} from "./types";
// Get User Information Function
export async function FindProfileWithUser(): Promise<
  UserResponse | ErrorResponse
> {
  const RESPONSE = await fetch(`${API}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GetJWT()}`,
    },
  });
  // Get Data from JSON
  const DATA = await RESPONSE.json();
  // If Response is not 200, return it as Error Response
  if (RESPONSE.ok == false) {
    return DATA as ErrorResponse;
  }
  // If Response is 200, return it as User Response
  return DATA as UserResponse;
}
// Function that allows to get the user backlog
export async function GetUserBacklog(): Promise<
  MinimalGameLogResponse[] | ErrorResponse
> {
  const RESPONSE = await fetch(`${API}/gameLogs/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GetJWT()}`,
    },
  });
  // Get Data from JSON
  const DATA = await RESPONSE.json();
  // If Response is not 200, return it as Error Response
  if (RESPONSE.ok == false) {
    return DATA as ErrorResponse;
  }
  // If Response is 200, return it as Minimal Game Log Response
  return DATA as MinimalGameLogResponse[];
}
// Find User Game Log
export async function FindUserLog(
  slug: string
): Promise<GameLogResponse | ErrorResponse> {
  const RESPONSE = await fetch(`${API}/gameLogs/user/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GetJWT()}`,
    },
  });
  // Get Data from JSON
  const DATA = await RESPONSE.json();
  // If Response is not 200, return it as Error Response
  if (RESPONSE.ok == false) {
    return DATA as ErrorResponse;
  }
  // If Response is 200, return it as Game Log Response
  return DATA as GameLogResponse;
}
// Add a new User Backlog
export async function AddUserGameLog(
  slug: string
): Promise<GameLogResponse | ErrorResponse> {
  const RESPONSE = await fetch(`${API}/gameLogs/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GetJWT()}`,
    },
    body: JSON.stringify({ game: slug }),
  });
  // Get Data from JSON
  const DATA = await RESPONSE.json();
  // If Response is not 200, return it as Error Response
  if (RESPONSE.ok == false) {
    return DATA as ErrorResponse;
  }
  // If Response is 200, return it as Game Log Response
  return DATA as GameLogResponse;
}
