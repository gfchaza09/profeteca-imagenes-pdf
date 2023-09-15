import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { showErrorAlert, showSuccessAlert } from 'src/app/shared/utils/swal';
import { translateEjsToHtml } from '../../../utils/ejsToHtml';

@Component({
  templateUrl: './upload-pdf-page.component.html',
  styles: [],
})
export class UploadPdfPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private validatorsService = inject(ValidatorsService);
  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    template: ['', Validators.required],
  });

  public variables: string[] = [];
  public variableForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.addVariable();
  }

  addVariable() {
    const newIndex = this.variables.length;
    this.variables.push(newIndex.toString()); // Agrega un nuevo índice a la lista
    this.variableForm.addControl(
      'nombre' + newIndex,
      this.fb.control('', Validators.required)
    );
    this.variableForm.addControl(
      'valor' + newIndex,
      this.fb.control('', Validators.required)
    );
  }

  resetForm() {
    this.myForm.reset();
    this.variableForm.reset();
    this.variables = [];

    const iframe = document.getElementById('previewFrame') as HTMLIFrameElement;

    // Limpia el contenido del iframe despues de enviar el nuevo template
    iframe.contentDocument?.open();
    iframe.contentDocument?.write('');
    iframe.contentDocument?.close();

    this.addVariable();
  }

  updatePreview() {
    if (!this.myForm.get('template')) return;

    const data: any = {};
    this.variables.forEach((variable) => {
      const nombre = this.variableForm.get('nombre' + variable)!.value;
      const valor = this.variableForm.get('valor' + variable)!.value;
      data[nombre] = valor;
    });

    const templateContent = this.myForm.get('template')!.value;

    const htmlCode = translateEjsToHtml(templateContent, data);

    // Obtén el iframe de vista previa
    const iframe = document.getElementById('previewFrame') as HTMLIFrameElement;

    // Actualiza el contenido del iframe con el contenido del textarea
    iframe.contentDocument?.open();
    iframe.contentDocument?.write(htmlCode);
    iframe.contentDocument?.close();
  }

  isValidField(field: string): boolean {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  uploadTemplate() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const nombre = this.myForm.get('nombre')!.value;
    const templateContent = this.myForm.get('template')!.value;

    // Crear un Blob a partir del contenido del textarea
    const blob = new Blob([templateContent], {
      type: 'application/octet-stream',
    });

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('template', blob, nombre + '.ejs');

    this.apiService.uploadTemplate(formData).subscribe((res: any) => {
      if (res.error) {
        showErrorAlert(res);
      } else {
        showSuccessAlert(typeof res === 'string' ? res : 'Acción completada');
        this.resetForm();
      }
    });
  }
}
