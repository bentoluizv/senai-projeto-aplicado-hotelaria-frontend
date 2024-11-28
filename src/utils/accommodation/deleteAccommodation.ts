export const deleteAccommodation = async (token: Token, ulid: string) => {
  const response = await fetch(`http://backend:8050/accommodations/${ulid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  if (response.status == 401) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  if (response.status != 200) {
    const error = await response.json();
    throw new Error(error.detail);
  }
};
