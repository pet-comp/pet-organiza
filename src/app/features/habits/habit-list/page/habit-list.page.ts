import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // Adicionado Router

import { HabitService } from '../../services/habit.service'; 
import { Habit } from '../../../../core/models/habit.model';
import { OrganizaButtonComponent } from '../../../../shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.page.html', 
  styleUrls: ['./habit-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, OrganizaButtonComponent]
})
export class HabitListPage implements OnInit {
  habits: Habit[] = [];
  weekDays: { name: string, day: number, isToday: boolean }[] = [];
  
  isModalOpen = false;
  selectedHabit: Habit | null = null;

  // Injetando o Router e o HabitService corretamente
  constructor(private habitService: HabitService, private router: Router) { }
  
  ngOnInit() {
    this.habits = this.habitService.getHabits();
    this.generateWeek();
  }

  handleHabitCreate() {
      this.router.navigate(['/mainLayout/habit-create']); // Agora this.router está definido
  }

  generateWeek() {
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - today.getDay() + 1 + i); 
      this.weekDays.push({
        name: dayNames[d.getDay()],
        day: d.getDate(),
        isToday: d.getDate() === today.getDate()
      });
    }
  }

  // Lógica do Modal
  openModal(habit: Habit) {
    this.selectedHabit = habit;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    setTimeout(() => {
      this.selectedHabit = null;
    }, 300); // Aguarda a animação terminar
  }

  confirmAction() {
    if (this.selectedHabit) {
      this.habitService.toggleCheckIn(this.selectedHabit.id);
      this.closeModal();
    }
  }
}