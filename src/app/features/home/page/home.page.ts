import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  user = this.authService.currentUser;
  isClaiming = signal<boolean>(false);

  showDailyReward = computed(() => {
    const u = this.user();
    return u !== null && !u.dailyReward;
  });

  ngOnInit() {}

  async claimDailyReward() {
    if (this.isClaiming()) return;
    this.isClaiming.set(true);
    try {
      await this.authService.resgatarRecompensaDiaria(12);
    } catch (error) {
      console.error('Erro ao resgatar recompensa diária:', error);
    } finally {
      this.isClaiming.set(false);
    }
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

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
