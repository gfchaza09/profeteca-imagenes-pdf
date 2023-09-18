import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './error404-page.component.html',
  styles: [],
})
export class Error404PageComponent {
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Error 404 - Página no encontrada');
  }
}
