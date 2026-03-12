import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cubes-list',
  templateUrl: './cubes-list.page.html',
  styleUrls: ['./cubes-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CubesListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
