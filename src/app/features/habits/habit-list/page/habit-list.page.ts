import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // Adicionado Router

import { HabitService } from '../../services/habit.service'; 
import { Habit, HabitView } from '../../../../core/models/habit.model';
import { OrganizaButtonComponent } from '../../../../shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.page.html', 
  styleUrls: ['./habit-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, OrganizaButtonComponent]
})

export class HabitListPage implements OnInit {
  habits: HabitView[] = [];
  weekDays: { name: string, day: number, dateObj: Date, isSelected: boolean }[] = [];
  
  selectedDate: Date = new Date();
  isModalOpen = false;
  selectedHabit: HabitView | null = null;

  constructor(private habitService: HabitService, private router: Router) { }
  
  ngOnInit() {
    this.selectedDate.setHours(0,0,0,0);
    this.generateWeek();
    this.refreshHabits();
  }

  // Atualiza ao entrar na tela (caso tenha vindo da tela de criação)
  ionViewWillEnter() {
    this.refreshHabits();
  }

  handleHabitCreate() {
      this.router.navigate(['/mainLayout/habit-create']);
  }

  // Calendário interativo
  generateWeek() {
    this.weekDays = [];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const today = new Date();
    today.setHours(0,0,0,0);
    
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - today.getDay() + 1 + i); // Começa na segunda
      
      this.weekDays.push({
        name: dayNames[d.getDay()],
        day: d.getDate(),
        dateObj: d,
        isSelected: d.getTime() === this.selectedDate.getTime()
      });
    }
  }

  // Ao clicar num dia do calendário
  selectDate(d: Date) {
    this.selectedDate = d;
    this.generateWeek(); // Atualiza a bolinha verde
    this.refreshHabits(); // Atualiza as barras de progresso
  }

  refreshHabits() {
    this.habits = this.habitService.getHabitsForDate(this.selectedDate);
  }

  // Modal interativo
  openModal(habit: HabitView) {
    this.selectedHabit = habit;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    setTimeout(() => this.selectedHabit = null, 300);
  }

  confirmAction() {
    if (this.selectedHabit) {
      this.habitService.toggleCheckIn(this.selectedHabit.id, this.selectedDate);
      this.refreshHabits(); // Recarrega visualmente
      this.closeModal();
    }
  }
}