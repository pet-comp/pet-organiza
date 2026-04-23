import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-new-habit',
  templateUrl: './new-habit.page.html',
  styleUrls: ['./new-habit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewHabitPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
