import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CubeViewPageRoutingModule } from './cube-view-routing.module';

import { CubeViewPage } from './page/cube-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CubeViewPageRoutingModule
  ]
})
export class CubeViewPageModule { }
