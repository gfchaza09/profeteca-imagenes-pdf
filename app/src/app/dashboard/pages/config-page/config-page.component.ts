import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Image } from '../../interfaces/image.interface';
import { ApiService } from '../../services/api.service';
import { showErrorAlert, showSuccessAlert } from 'src/app/shared/utils/swal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './config-page.component.html',
  styles: [],
})
export class ConfigPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);
  private apiService = inject(ApiService);
  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    backgroundImage: ['', Validators.required],
    css: this.fb.group({
      textColor: ['', Validators.required],
      fontFamilyUrl: ['', Validators.required],
      fontFamily: ['', Validators.required],
      text1: this.fb.group({
        top: ['', Validators.required],
        left: ['', Validators.required],
        fontSize: ['', Validators.required],
        fontWeight: ['', Validators.required],
        lineHeight: ['', Validators.required],
        textAlign: ['', Validators.required],
      }),
      text2: this.fb.group({
        top: ['', Validators.required],
        left: ['', Validators.required],
        fontSize: ['', Validators.required],
        fontWeight: ['', Validators.required],
        lineHeight: ['', Validators.required],
        textAlign: ['', Validators.required],
      }),
    }),
  });

  public images: Image[] = [];
  public selectedImage?: Image | null;
  public previewHTML: any = '';

  ngOnInit(): void {
    this.apiService.getImages().subscribe((images) => (this.images = images));
  }

  onImageSelected(event: any) {
    const selectedImagePath = event?.target?.value;
    if (selectedImagePath) {
      this.selectedImage = this.images.find(
        (image) => image.path === selectedImagePath
      );
    }
    this.generatePreview();
  }

  generatePreview() {
    const formValue = this.myForm.value;

    // Construir la vista previa en HTML usando los valores del formulario
    const previewHTML = `
      <head>
        <style>
          @import url(${formValue.css.fontFamilyUrl});
          body {
            margin: 0;
            padding: 0;
            color: ${formValue.css.textColor};
            font-family: ${formValue.css.fontFamily};
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .text1 {
            position: absolute;
            top: ${formValue.css.text1.top};
            left: ${formValue.css.text1.left};
            font-size: ${formValue.css.text1.fontSize};
            font-weight: ${formValue.css.text1.fontWeight};
            line-height: ${formValue.css.text1.lineHeight};
            text-align: ${formValue.css.text1.textAlign};
          }
          .text2 {
            position: absolute;
            top: ${formValue.css.text2.top};
            left: ${formValue.css.text2.left};
            font-size: ${formValue.css.text2.fontSize};
            font-weight: ${formValue.css.text2.fontWeight};
            text-align: ${formValue.css.text2.textAlign};
          }
        </style>
      </head>
      <body>
        <img src="data:image/jpeg;base64,${this.selectedImage?.base64}" alt="bg" />
        <div class="text1">Texto 1 de ejemplo</div>
        <div class="text2">Texto 2 de ejemplo</div>
      </body>
    `;

    // Asignar la vista previa al componente
    this.previewHTML = this.sanitizer.bypassSecurityTrustHtml(previewHTML);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const form = this.myForm.value;
    const name = this.myForm.get('name')!.value;

    const jsonBlob = new Blob([JSON.stringify(form)], {
      type: 'application/json',
    });

    const formData = new FormData();
    formData.append('config', jsonBlob, `${name}.json`);
    formData.append('nombre', name);

    this.apiService.uploadJSON(formData).subscribe((res: any) => {
      if (res.error) {
        showErrorAlert(res);
      } else {
        showSuccessAlert(typeof res === 'string' ? res : 'Acción completada');
        this.myForm.reset();
      }
    });
  }
}
