import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewHabitPage } from './page/new-habit.page';

const routes: Routes = [
  {
    path: '',
    component: NewHabitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewHabitPageRoutingModule {}
