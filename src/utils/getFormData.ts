export const getFormData = (formData: FormData) => {
  const obj: any = {};

  formData.forEach((valor, chave) => {
    obj[chave] = valor;
  });

  return obj;
};

export const getAccommodationFormData = (formData: FormData) => {
  const obj: any = {};
  const amenities: string[] = [];

  formData.forEach((value, key) => {
    if (value == "on") {
      amenities.push(key);
    } else {
      obj[key] = value;
    }
  });

  const accommodationData = { ...obj, amenities };

  return accommodationData;
};
