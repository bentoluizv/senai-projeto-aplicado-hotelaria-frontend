export const deleteAmenitie = async (token: Token, id: string) => {
  const response = await fetch(`http://backend:8050/amenities/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  if (response.status == 401) {
    const error = await response.json();
    throw new Error(error.detail || "Auth failed");
  }

  if (response.status != 200) {
    const error = await response.json();
    throw new Error(error.detail);
  }
};
