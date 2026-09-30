import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  private authService = inject(AuthService);
  user = this.authService.currentUser;

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

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
