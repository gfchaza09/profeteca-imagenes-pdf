import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomeImagePageComponent } from './pages/image/home-image-page/home-image-page.component';
import { UploadImagePageComponent } from './pages/image/upload-image-page/upload-image-page.component';
import { ConfigImagePageComponent } from './pages/image/config-image-page/config-image-page.component';
import { ImageTableComponent } from './components/image-table/image-table.component';
import { ConfigTableComponent } from './components/config-table/config-table.component';
import { HomePdfPageComponent } from './pages/pdf/home-pdf-page/home-pdf-page.component';
import { UploadPdfPageComponent } from './pages/pdf/upload-pdf-page/upload-pdf-page.component';
import { ListPdfPageComponent } from './pages/pdf/list-pdf-page/list-pdf-page.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    HomeImagePageComponent,
    UploadImagePageComponent,
    ConfigImagePageComponent,
    ImageTableComponent,
    ConfigTableComponent,
    HomePdfPageComponent,
    UploadPdfPageComponent,
    ListPdfPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule {}
