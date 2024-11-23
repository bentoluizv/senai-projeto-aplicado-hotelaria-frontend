import { guestSchema } from "../../schemas/guest";

export const findGuestByID = async (token: Token, ulid: string) => {
  const response = await fetch(`http://backend:8050/guests/${ulid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  if (response.status == 401) {
    throw new Error(`Auth failed`);
  }

  if (response.status != 200) {
    throw new Error(
      `Something went wrong with your request!! Response status: ${response.status}`
    );
  }

  const data = await response.json();

  const guest = await guestSchema.parseAsync(data);

  return guest;
};
