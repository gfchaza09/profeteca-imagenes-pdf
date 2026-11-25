import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { environment } from 'src/environments/environments';
import { ApiService } from '../../../services/api.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { Template } from '../../../interfaces/template.interface';
import { showURLPDF } from 'src/app/shared/utils/swal';

@Component({
  templateUrl: './home-pdf-page.component.html',
  styles: [],
})
export class HomePdfPageComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private validatorsService = inject(ValidatorsService);
  private titleService = inject(Title);

  public myForm: FormGroup = this.fb.group({
    template: ['', Validators.required],
    id: ['', [Validators.required]],
  });

  public availableTemplates: Template[] | null = [];
  public loading: boolean = false;

  ngOnInit(): void {
    this.titleService.setTitle('Generar PDF - Profeteca Imágenes');
    this.getTemplatesList();
  }

  getTemplatesList() {
    this.loading = true;
    this.apiService.getTemplates().subscribe((templates) => {
      this.availableTemplates = templates;
      this.loading = false;
    });
  }

  isValidField(field: string): boolean {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  generatePDF() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const template = this.myForm.get('template')?.value;
    const id = this.myForm.get('id')?.value;

    const pdfPath = `${this.apiUrl}/pdf/${template}/${id}/doc.pdf`;

    showURLPDF(pdfPath);
  }
}
