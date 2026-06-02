import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CubeViewPage } from './page/cube-view.page';

const routes: Routes = [
  {
    path: '',
    component: CubeViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CubeViewPageRoutingModule { }
