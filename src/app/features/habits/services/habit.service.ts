import { Injectable } from '@angular/core';
import { Habit } from '../../../core/models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  
  // Dados iniciai
    private habits: Habit[] = [
    { id: '1', title: 'Beber água', color: '#1B31A8', lightColor: '#F2F5FF', reminder: 'Diário', daysLeft: 'infinite', record: 3, progressPercentage: 0, isInfinity: true },
    { id: '2', title: 'Ler um livro', color: '#FF5C5C', lightColor: '#FFEBEB', reminder: 'Semanal', daysLeft: 36, record: 12, progressPercentage: 50, isInfinity: false },
    { id: '3', title: 'Aula de Natação', color: '#D4AF37', lightColor: '#FFFDF5', reminder: 'Ter, Qui', daysLeft: 140, record: 12, progressPercentage: 25, isInfinity: false },
    { id: '4', title: 'Aula de Yoga', color: '#A151A3', lightColor: '#F8F0F9', reminder: 'Ter, Qui', daysLeft: 140, record: 12, progressPercentage: 75, isInfinity: false },
    ];

  constructor() { }

  getHabits(): Habit[] {
    return this.habits;
  }

  // Novo método para criar hábitos
  addHabit(newHabitData: Partial<Habit>) {
    const newHabit: Habit = {
      id: Date.now().toString(), // Gera um ID único
      title: newHabitData.title || 'Novo Hábito',
      color: newHabitData.color || '#f4c2ff',
      lightColor: (newHabitData.color || '#f4c2ff') + '33', // Adiciona 30% de opacidade para a cor clara do fundo
      reminder: newHabitData.reminder || 'Diário',
      daysLeft: newHabitData.isInfinity ? 'infinite' : 30, // Padrão
      record: 0,
      progressPercentage: 0,
      isInfinity: newHabitData.isInfinity || false
    };
    
    // Adiciona no topo da lista
    this.habits.unshift(newHabit);
  }

  toggleCheckIn(habitId: string) {
    const habit = this.habits.find(h => h.id === habitId);
    if (habit) {
      habit.progressPercentage = habit.progressPercentage === 100 ? 0 : 100;
      if (habit.progressPercentage === 100) {
        habit.record += 1;
      } else {
        habit.record -= 1;
      }
    }
  }
}