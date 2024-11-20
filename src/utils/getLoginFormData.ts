export const getLoginFormData = async (request: Request) => {
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !password) throw new Error("Invalid Form Data");

  const data = new URLSearchParams();

  data.append("username", username);
  data.append("password", password);

  return data;
};
