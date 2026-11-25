import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environments';

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

  public localMode = environment.localMode;

  public pdfItems: MenuItem[] = [
    {
      title: 'Generar PDF',
      icon: 'fas fa-download',
      route: '/dashboard/pdf/home',
    },
    {
      title: 'Cargar Templates',
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
