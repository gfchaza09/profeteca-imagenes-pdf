import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public isValidField(form: FormGroup, field: string): boolean {
    return !!form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Campo requerido.';
        case 'invalidInput':
          return 'El campo contiene caracteres inválidos.';
        case 'invalidMimeType':
          return 'El formato de imagen no es válido.';
        case 'invalidFileSize':
          return 'Tamaño de archivo demasiado grande. El máximo permitido es 5 MB.';
      }
    }

    return null;
  }

  public isValidMimeType(mimeType: string): boolean {
    // Lista de tipos MIME permitidos
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedMimes.includes(mimeType);
  }
}
