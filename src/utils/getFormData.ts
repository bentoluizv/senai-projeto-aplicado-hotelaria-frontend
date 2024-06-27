export const getFormData = (form: HTMLFormElement) => {
  const dataInForm: { [key: string]: string | File } = {};
  const formData = new FormData(form);
  for (const [key, v] of formData.entries()) {
    dataInForm[key] = v;
  }
  return dataInForm;
};
