import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

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
  currentWeekStart: Date = new Date(); // Controla qual semana está em exibição
  isModalOpen = false;
  selectedHabit: HabitView | null = null;

  constructor(private habitService: HabitService, private router: Router) { }

  ngOnInit() {
    this.selectedDate.setHours(0, 0, 0, 0);
    this.currentWeekStart.setHours(0, 0, 0, 0);
    this.generateWeek();
    this.refreshHabits();
  }

  ionViewWillEnter() {
    this.refreshHabits();
  }

  handleHabitCreate() {
    this.router.navigate(['/mainLayout/habit-create']);
  }

  // Gera a semana dinamicamente baseada no estado de navegação atual
  generateWeek() {
    this.weekDays = [];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    // Encontra a segunda-feira da semana que está sendo visualizada no momento
    const baseDate = new Date(this.currentWeekStart);
    const dayOfWeek = baseDate.getDay();
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() + distanceToMonday);

    // Gera o bloco de 6 dias (Segunda a Sábado) baseado nessa segunda-feira específica
    for (let i = 0; i < 6; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      this.weekDays.push({
        name: dayNames[d.getDay()],
        day: d.getDate(),
        dateObj: d,
        isSelected: d.getTime() === this.selectedDate.getTime()
      });
    }
  }

  // Avança (+7) ou retrocede (-7) uma semana inteira no calendário
  navigateWeek(days: number) {
    const newWeek = new Date(this.currentWeekStart);
    newWeek.setDate(newWeek.getDate() + days);
    this.currentWeekStart = newWeek;

    this.generateWeek();
  }

  getCurrentMonthName(): string {
    // Formata o mês atual baseado na semana em exibição
    const monthName = this.currentWeekStart.toLocaleDateString('pt-BR', { month: 'long' });

    // Coloca a primeira letra em maiúsculo (ex: "junho" vira "Junho")
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

  selectDate(d: Date) {
    this.selectedDate = d;
    this.generateWeek();
    this.refreshHabits();
  }

  refreshHabits() {
    this.habits = this.habitService.getHabitsForDate(this.selectedDate);
  }

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
      this.refreshHabits();
      this.closeModal();
    }
  }

  editHabit(habitId: string, event: Event) {
    event.stopPropagation(); // Impede o modal de check-in de abrir junto!

    // Navega para a tela de criação enviando o ID do hábito como parâmetro query
    this.router.navigate(['/mainLayout/habit-create'], { queryParams: { id: habitId } });
  }

  deleteHabit(habitId: string, event: Event) {
    event.stopPropagation(); // Impede o modal de check-in de abrir junto!

    if (confirm('Tem certeza que deseja excluir permanentemente este hábito?')) {
      this.habitService.deleteHabit(habitId);
      this.refreshHabits(); // Atualiza a lista na tela instantaneamente
    }
  }
}