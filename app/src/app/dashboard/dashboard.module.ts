import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { ImageTableComponent } from './components/image-table/image-table.component';
import { ConfigTableComponent } from './components/config-table/config-table.component';

@NgModule({
  declarations: [
    HomePageComponent,
    LayoutPageComponent,
    UploadPageComponent,
    ConfigPageComponent,
    ImageTableComponent,
    ConfigTableComponent,
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
