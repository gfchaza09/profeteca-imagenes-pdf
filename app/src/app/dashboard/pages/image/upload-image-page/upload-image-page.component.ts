import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { showErrorAlert, showSuccessAlert } from 'src/app/shared/utils/swal';
import { ApiService } from '../../../services/api.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { Image } from '../../../interfaces/image.interface';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './upload-image-page.component.html',
  styles: [],
})
export class UploadImagePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private validatorsService = inject(ValidatorsService);
  private titleService = inject(Title);

  public selectedImage?: File;
  public myForm: FormGroup = this.fb.group({
    foto: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  public loading: boolean = false;
  public images: Image[] | null = [];

  ngOnInit(): void {
    this.titleService.setTitle('Imagenes - Trami-Imagenes/PDF');
    this.getImagesList();
  }

  getImagesList() {
    this.loading = true;
    this.apiService.getImages().subscribe((images) => {
      this.images = images;
      this.loading = false;
    });
  }

  isValidField(field: string): boolean {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB en bytes

    if (file) {
      if (this.validatorsService.isValidMimeType(file.type)) {
        this.selectedImage = file;
      } else {
        this.myForm.controls['foto'].setErrors({ invalidMimeType: true });
        return;
      }
    }
    if (file && file.size > maxFileSize) {
      this.myForm.controls['foto'].setErrors({ invalidFileSize: true });
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

        this.getImagesList();
      }
    });
  }
}
