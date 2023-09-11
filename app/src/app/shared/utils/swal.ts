import Swal from 'sweetalert2';

export const showConfirmationAlert = async (message: string) => {
  return Swal.fire({
    title: '¿Está seguro que desea continuar?',
    text: message,
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    timer: 2000,
    timerProgressBar: true,
  });
};

export const showErrorAlert = async (error: any) => {
  return Swal.fire({
    title: `Error ${error.status}`,
    text: error.error.message ? error.error.message : 'Vuelva a intentar',
    icon: 'error',
    timer: 2000,
    timerProgressBar: true,
  });
};

export const showSuccessAlert = async (message: string) => {
  return Swal.fire({
    title: 'Acción completada',
    text: message,
    icon: 'success',
    timer: 1800,
    timerProgressBar: true,
  });
};

export const showURLImage = async (url: string) => {
  return Swal.fire({
    title: 'Imagen generada',
    imageUrl: url,
    html: `<a href="${url}" target="_blank">Click aquí</a>`,
    imageWidth: 400,
    imageHeight: 400,
  });
};
