import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public imageItems: MenuItem[] = [
    {
      title: 'Generar Imagen',
      icon: 'fas fa-download',
      route: '/dashboard/image/home',
    },
    {
      title: 'Carga Imagen',
      icon: 'fas fa-upload',
      route: '/dashboard/image/upload',
    },
    {
      title: 'Configuraciones',
      icon: 'fas fa-clipboard-check',
      route: '/dashboard/image/config',
    },
  ];

  public pdfItems: MenuItem[] = [
    {
      title: 'Generar PDF',
      icon: 'fas fa-download',
      route: '/dashboard/pdf/home',
    },
    {
      title: 'Carga Templates',
      icon: 'fas fa-upload',
      route: '/dashboard/pdf/upload',
    },
    {
      title: 'Lista Templates',
      icon: 'fas fa-list',
      route: '/dashboard/pdf/list',
    },
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
