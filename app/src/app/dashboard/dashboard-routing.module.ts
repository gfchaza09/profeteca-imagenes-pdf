import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomeImagePageComponent } from './pages/image/home-image-page/home-image-page.component';
import { UploadImagePageComponent } from './pages/image/upload-image-page/upload-image-page.component';
import { ConfigImagePageComponent } from './pages/image/config-image-page/config-image-page.component';
import { HomePdfPageComponent } from './pages/pdf/home-pdf-page/home-pdf-page.component';
import { UploadPdfPageComponent } from './pages/pdf/upload-pdf-page/upload-pdf-page.component';
import { ListPdfPageComponent } from './pages/pdf/list-pdf-page/list-pdf-page.component';
import { EditorPageComponent } from './pages/editor/editor-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        component: EditorPageComponent,
      },
      {
        path: 'image/home',
        component: HomeImagePageComponent,
      },
      {
        path: 'image/upload',
        component: UploadImagePageComponent,
      },
      {
        path: 'image/config',
        component: ConfigImagePageComponent,
      },
      {
        path: 'pdf/home',
        component: HomePdfPageComponent,
      },
      {
        path: 'pdf/upload',
        component: UploadPdfPageComponent,
      },
      {
        path: 'pdf/list',
        component: ListPdfPageComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
