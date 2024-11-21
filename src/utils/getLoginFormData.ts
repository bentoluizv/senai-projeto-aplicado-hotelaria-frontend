export const getLoginFormData = async (formData: FormData) => {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !password) throw new Error("Invalid Form Data");

  const data = new URLSearchParams();

  data.append("username", username);
  data.append("password", password);

  return data;
};
