import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissionListPageRoutingModule } from './mission-list-routing.module';

import { MissionListPage } from './page/mission-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissionListPageRoutingModule,
    MissionListPage
  ],
})
export class MissionListPageModule {}
