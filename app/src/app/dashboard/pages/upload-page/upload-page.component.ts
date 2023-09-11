import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { showErrorAlert, showSuccessAlert } from 'src/app/shared/utils/swal';
import { ApiService } from '../../services/api.service';
import { catchError } from 'rxjs';

@Component({
  templateUrl: './upload-page.component.html',
  styles: [],
})
export class UploadPageComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  selectedImage?: File;
  public myForm: FormGroup = this.fb.group({
    foto: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  isValidField(field: string): boolean {
    return (
      !!this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.selectedImage) {
      showErrorAlert(new Error('Selecciona una imagen por favor'));
      return;
    }

    const formData = new FormData();

    formData.append('foto', this.selectedImage);
    formData.append('descripcion', this.myForm.get('descripcion')!.value);

    this.apiService.uploadImage(formData).subscribe((res: any) => {
      if (res.error) {
        showErrorAlert(res);
      } else {
        showSuccessAlert(typeof res === 'string' ? res : 'Acción completada');
        this.myForm.reset();
      }
    });
  }
}
