export const formatPhoneNumber = (phone: string) => {
  const regex = /^(\d{2})(\d{5})(\d{4})$/;
  const match = phone.match(regex);

  if (!match) {
    throw new Error("Número de telefone inválido.");
  }

  return `(${match[1]}) ${match[2]}-${match[3]}`;
};
