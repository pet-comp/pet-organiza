import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CubesListPageRoutingModule } from './cubes-list-routing.module';

import { CubesListPage } from './page/cubes-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CubesListPageRoutingModule,
    CubesListPage
  ],
})
export class CubesListPageModule {}
