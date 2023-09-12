import { Component, Input, OnInit, inject } from '@angular/core';
import { Image } from '../../interfaces/image.interface';
import { ApiService } from '../../services/api.service';
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from 'src/app/shared/utils/swal';

@Component({
  selector: 'dashboard-image-table',
  templateUrl: './image-table.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination {
        padding: 0;
      }
    `,
  ],
})
export class ImageTableComponent {
  private apiService = inject(ApiService);
  @Input() public images: Image[] | null = [];
  @Input() public loading: boolean = false;

  public page: number = 1;
  public limit: number = 5;

  async onDeleteImage(id: string) {
    const result = await showConfirmationAlert('¿Desea eliminar esta imagen?');

    if (!result.isConfirmed) return;

    this.apiService.deleteImage(id).subscribe((res: any) => {
      if (res.error) {
        showErrorAlert(res.error);
      } else {
        showSuccessAlert('Imagen eliminada correctamente');
        this.apiService.getImages();
      }
    });
  }
}
