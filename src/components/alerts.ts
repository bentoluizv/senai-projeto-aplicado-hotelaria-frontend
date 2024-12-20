import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const ConfirmDelete = Swal.mixin({
  title: "Você tem certeza?",
  text: "Essa ação é irreversível! Não será possível recuperar os dados",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sim, delete!",
});

export const ConfirmCancel = Swal.mixin({
  title: "Você tem certeza?",
  text: "Essa ação é irreversível! Não será possível reativar essa reserva!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sim, cancele!",
});

export const ConfirmAccommodationSelection = Swal.mixin({
  title: "Você tem certeza?",
  text: "Confirme a escolha da acomodação",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sim!",
});
