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
  public menuItems: MenuItem[] = [
    {
      title: 'Home',
      icon: 'fas fa-home',
      route: '/dashboard/home',
    },
    {
      title: 'Carga Imagen',
      icon: 'fas fa-upload',
      route: '/dashboard/upload',
    },
    {
      title: 'Configuraciones',
      icon: 'fas fa-clipboard-check',
      route: '/dashboard/config',
    },
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
