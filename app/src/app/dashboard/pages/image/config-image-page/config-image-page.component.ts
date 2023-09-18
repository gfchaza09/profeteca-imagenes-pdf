import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, Title } from '@angular/platform-browser';

import { showErrorAlert, showSuccessAlert } from 'src/app/shared/utils/swal';
import { Image } from '../../../interfaces/image.interface';
import { ApiService } from '../../../services/api.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { cleanHTML } from '../../../utils/cleanerText';

@Component({
  templateUrl: './config-image-page.component.html',
  styles: [],
})
export class ConfigImagePageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);
  private apiService = inject(ApiService);
  private validatorsService = inject(ValidatorsService);
  private titleService = inject(Title);

  myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    text1: ['Texto1%0Ade prueba'],
    text2: ['Texto2 de prueba'],
    backgroundImage: ['', Validators.required],
    css: this.fb.group({
      fontFamilyUrl: [''],
      text1: this.fb.group({
        top: [''],
        left: [''],
        fontFamily: [''],
        textColor: [''],
        fontSize: [''],
        fontWeight: [''],
        fontStyle: [''],
        letterSpacing: [''],
        lineHeight: [''],
        textAlign: [''],
        textShadow: [''],
      }),
      text2: this.fb.group({
        top: [''],
        left: [''],
        fontFamily: [''],
        textColor: [''],
        fontSize: [''],
        fontWeight: [''],
        fontStyle: [''],
        letterSpacing: [''],
        lineHeight: [''],
        textAlign: [''],
        textShadow: [''],
      }),
    }),
  });

  public images: Image[] | null = [];
  public selectedImage?: Image | null;
  public previewHTML: any = '';

  ngOnInit(): void {
    this.titleService.setTitle('Configuraciones - Trami-Imagenes/PDF');
    this.apiService.getImages().subscribe((images) => {
      this.images = images;
    });

    this.myForm.valueChanges.subscribe(() => {
      this.generatePreview();
    });
  }

  get formValue() {
    const { text1, text2, ...formValue } = this.myForm.value;
    return formValue;
  }

  isValidField(field: string): boolean {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  onImageSelected(event: any) {
    const selectedImageId = event?.target?.value;
    if (selectedImageId && this.images) {
      this.selectedImage = this.images.find(
        (image) => image.id === selectedImageId
      );
      this.generatePreview();
    }
  }

  generatePreview() {
    if (!this.selectedImage) return;
    const formValue = this.myForm.value;
    const base64Image = `data:image/jpeg;base64,${this.selectedImage!.base64}`;

    const img = new Image();

    img.onload = () => {
      const text1Convertido = formValue.text1
        .replace(/-/g, '/')
        .replace(/\+/g, '.')
        .replace(/%0A/g, '<br>');

      const text2Convertido = cleanHTML(formValue.text2)
        .replace(/-/g, '/')
        .replace(/\+/g, '.')
        .replace(/%0A/g, '<br>');

      const previewHTML = `
        <head>
          <style>
            @import url(${formValue.css.fontFamilyUrl});
            body {
              margin: 0;
              padding: 0;
              width: ${img.width / 2}px;
              height: ${img.height / 2}px;
            }
            .img {
              position: absolute;
              top: 0;
              left: 0;
              width: ${img.width / 2}px;
              height: ${img.height / 2}px;
              border: 1px solid black;
              user-select: none;
            }
            .text1 {
              position: absolute;
              top: ${formValue.css.text1.top / 2}px;
              left: ${formValue.css.text1.left / 2}px;
              font-family: ${formValue.css.text1.fontFamily};
              color: ${formValue.css.text1.textColor};
              font-size: ${formValue.css.text1.fontSize / 2}px;
              font-weight: ${formValue.css.text1.fontWeight};
              font-style: ${formValue.css.text1.fontStyle};
              letter-spacing: ${formValue.css.text1.letterSpacing};
              line-height: ${formValue.css.text1.lineHeight};
              text-align: ${formValue.css.text1.textAlign};
              text-shadow: ${formValue.css.text1.textShadow};
              white-space: nowrap;
            }
            .text2 {
              position: absolute;
              top: ${formValue.css.text2.top / 2}px;
              left: ${formValue.css.text2.left / 2}px;
              font-family: ${formValue.css.text2.fontFamily};
              color: ${formValue.css.text2.textColor};
              font-size: ${formValue.css.text2.fontSize / 2}px;
              font-weight: ${formValue.css.text2.fontWeight};
              font-style: ${formValue.css.text2.fontStyle};
              letter-spacing: ${formValue.css.text2.letterSpacing};
              line-height: ${formValue.css.text2.lineHeight};
              text-align: ${formValue.css.text2.textAlign};
              text-shadow: ${formValue.css.text2.textShadow};
              white-space: nowrap;
            }
          </style>
        </head>
        <body>
          <img src=${base64Image} alt="bg" class="img"/>
          <div class="text1">${text1Convertido}</div>
          <div class="text2">${text2Convertido}</div>
        </body>
      `;
      // Asignar la vista previa al componente
      this.previewHTML = this.sanitizer.bypassSecurityTrustHtml(previewHTML);
    };

    img.src = base64Image;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const { text1, text2, ...form } = this.myForm.value;
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
        this.myForm.reset({
          text1: 'Texto1%0Ade prueba',
          text2: 'Texto2 de prueba',
        });
        this.selectedImage = null;
      }
    });
  }
}
