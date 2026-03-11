import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CubesListPage } from './page/cubes-list.page';

const routes: Routes = [
  {
    path: '',
    component: CubesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CubesListPageRoutingModule {}
