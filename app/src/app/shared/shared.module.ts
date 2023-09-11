import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Error404PageComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
