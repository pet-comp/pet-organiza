import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionListPage } from './page/mission-list.page';

const routes: Routes = [
  {
    path: '',
    component: MissionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionListPageRoutingModule {}
