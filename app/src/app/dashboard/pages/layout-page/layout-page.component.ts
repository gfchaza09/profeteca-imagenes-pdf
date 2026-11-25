import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent {
  private router = inject(Router);

  showPdfDbNotice$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(() => this.router.url.includes('/dashboard/pdf')),
    startWith(this.router.url.includes('/dashboard/pdf'))
  );
}
