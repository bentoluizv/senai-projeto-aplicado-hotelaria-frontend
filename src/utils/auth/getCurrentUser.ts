import { userSchema } from "../../schemas/user";

export const getCurrentUser = async (token: Token) => {
  const response = await fetch("http://backend:8050/auth/current", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  const data = await response.json();

  const user = await userSchema.parseAsync(data);

  return user;
};
