import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.page.html',
  styleUrls: ['./mission-list.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MissionListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
