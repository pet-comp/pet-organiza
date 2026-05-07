import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitCreatePageRoutingModule } from './habit-create-routing.module';

import { HabitCreatePage } from './habit-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitCreatePageRoutingModule,
    HabitCreatePage,
  ],
  declarations: []
})
export class HabitCreatePageModule {}
