import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { ConfigPageComponent } from './pages/config-page/config-page.component';

@NgModule({
  declarations: [HomePageComponent, LayoutPageComponent, UploadPageComponent, ConfigPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule {}
