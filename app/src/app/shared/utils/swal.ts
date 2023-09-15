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
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      closeButton: 'custom-close-button',
    },
    html: `<a href="${url}" target="_blank">Click aquí</a>`,
    imageUrl: url,
    imageWidth: 420,
    imageHeight: 420,
  });
};

export const showURLPDF = async (url: string, preview?: boolean) => {
  return Swal.fire({
    title: 'PDF generado',
    html: preview
      ? `
    <div id="pdf-container" style="width: 100%; height: 700px;"></div>
    `
      : `
    <div id="pdf-container" style="width: 100%; height: 700px;"></div>
    <a href="${url}" target="_blank">Click aquí</a>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      closeButton: 'custom-close-button',
    },
    didOpen: () => {
      Swal.showLoading();
      const pdfContainer = document.getElementById('pdf-container');
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.onload = () => {
        Swal.hideLoading();
      };
      if (pdfContainer) pdfContainer.appendChild(iframe);
    },
  });
};

export const showPromptForInput = async (): Promise<string | null> => {
  const { value: input } = await Swal.fire({
    title: 'Ingrese un ID',
    input: 'text',
    inputPlaceholder: 'Ingrese un ID',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Debe ingresar un valor';
      }
      return;
    },
  });

  if (input === undefined) {
    // El usuario hizo clic en Cancelar
    return null;
  } else {
    return input;
  }
};
