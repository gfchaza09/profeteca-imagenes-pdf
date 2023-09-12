import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Config } from '../../interfaces/config.interface';
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from 'src/app/shared/utils/swal';

@Component({
  selector: 'dashboard-config-table',
  templateUrl: './config-table.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination {
        padding: 0;
      }
    `,
  ],
})
export class ConfigTableComponent {
  private apiService = inject(ApiService);
  @Input() public configs: Config[] | null = [];
  @Input() public loading: boolean = false;

  public page: number = 1;
  public limit: number = 10;

  async onDeleteConfig(id: string) {
    const result = await showConfirmationAlert(
      '¿Desea eliminar esta configuraión?'
    );

    if (!result.isConfirmed) return;

    this.apiService.deleteConfig(id).subscribe((res: any) => {
      if (res.error) {
        showErrorAlert(res.error);
      } else {
        showSuccessAlert('Configuración eliminada correctamente');
        this.apiService.getConfigs();
      }
    });
  }
}
