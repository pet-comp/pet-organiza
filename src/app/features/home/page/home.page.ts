import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,]
})

export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToTasks() {
    this.router.navigate(['/mainLayout/tasks']);
  }

  navigateToHabits() {
    this.router.navigate(['/mainLayout/habits']);
  }

  navigateToMissions() {
    this.router.navigate(['/mainLayout/missions']);
  }

  navigateToCubes() {
    this.router.navigate(['/mainLayout/cubes']);
  }
}
