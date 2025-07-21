// Login Endpoint Requirements
import usersList from "@/db/users.json";
// Login Endpoint Main Function
export async function POST(request: Request) {
  const BODY = await request.json();
  const { email, password } = BODY;
  // Login to internal API endpoint
  const USER = usersList.find((user) => user.email === email);
  const RESPONSE =
    USER?.password === password
      ? { status: 200, jwt: email }
      : { status: 500, jwt: null, message: "Usuario o Contraseña no Válidos" };
  // Return the response from the internal API as the final result
  return new Response(JSON.stringify(RESPONSE), {
    headers: { "Content-Type": "application/json" },
    status: RESPONSE.status,
  });
}
