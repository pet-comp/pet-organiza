import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewHabitPageRoutingModule } from './new-habit-routing.module';

import { NewHabitPage } from './page/new-habit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewHabitPageRoutingModule
  ],
  declarations: [NewHabitPage]
})
export class NewHabitPageModule {}
