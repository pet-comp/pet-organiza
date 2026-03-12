import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitListPageRoutingModule } from './habit-list-routing.module';

import { HabitListPage } from './page/habit-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitListPageRoutingModule,
    HabitListPage
  ],
})
export class HabitListPageModule {}
