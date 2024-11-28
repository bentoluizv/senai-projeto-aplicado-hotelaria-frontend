export const getRefreshedToken = async (token: Token) => {
  const response = await fetch("http://backend:8050/auth/refresh_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Authentication Failed");
  }
  const refreshedToken: Token = await response.json();

  return refreshedToken;
};
