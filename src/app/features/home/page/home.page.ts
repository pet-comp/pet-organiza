import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/user.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  user: UserProfile = {
    id: 'user_01',
    name: 'Inserir Texto',
    username: 'inserir.texto',
    email: 'inserir.texto@email.com',
    birthDate: '15/05/2002',
    collectionLevel: 5,
    arestas: 1500,
    equippedCube: 'Clubo Penguin',
    avatarUrl: 'assets/cubes/penguin.svg',
  };

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
