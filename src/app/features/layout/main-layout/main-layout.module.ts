import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainLayoutPageRoutingModule } from './main-layout-routing.module';

import { MainLayoutPage } from './main-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainLayoutPageRoutingModule,
    MainLayoutPage
  ]
})
export class MainLayoutPageModule {}
