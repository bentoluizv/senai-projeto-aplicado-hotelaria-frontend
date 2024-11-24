export const getFormData = (form: HTMLFormElement) => {
  const dataInForm: { [key: string]: string | File } = {};
  const formData = new FormData(form);
  for (const [key, v] of formData.entries()) {
    dataInForm[key] = v;
  }
  return dataInForm;
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
