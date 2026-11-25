import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Template } from '../../../interfaces/template.interface';
import { ApiService } from '../../../services/api.service';
import {
  showConfirmationAlert,
  showErrorAlert,
  showPromptForInput,
  showSuccessAlert,
  showURLPDF,
} from 'src/app/shared/utils/swal';
import { environment } from 'src/environments/environments';

@Component({
  templateUrl: './list-pdf-page.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination {
        padding: 0;
      }
    `,
  ],
})
export class ListPdfPageComponent implements OnInit {
  private apiUrl: string = environment.apiUrl;
  private apiService = inject(ApiService);
  private titleService = inject(Title);

  public templates: Template[] | null = [];
  public loading: boolean = false;

  public page: number = 1;
  public limit: number = 20;

  ngOnInit(): void {
    this.titleService.setTitle('Lista Templates - Profeteca Imágenes');

    this.getTemplatesList();
  }

  getTemplatesList() {
    this.loading = true;
    this.apiService.getTemplates().subscribe((templates) => {
      this.templates = templates;
      this.loading = false;
    });
  }

  async previewTemplate(template: Template): Promise<void> {
    const input = await showPromptForInput();

    if (!input) return;

    const pdfPath = `${this.apiUrl}/pdf/${template._id}/${input}/doc.pdf`;

    showURLPDF(pdfPath, true);
  }

  async onDeleteTemplate(id: string) {
    const result = await showConfirmationAlert(
      '¿Desea eliminar esta configuraión?'
    );

    if (!result.isConfirmed) return;

    this.apiService.deleteTemplate(id).subscribe((res: any) => {
      if (res.error) {
        showErrorAlert(res.error);
      } else {
        showSuccessAlert('Configuración eliminada correctamente');
        this.getTemplatesList();
      }
    });
  }
}
