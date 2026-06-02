import { Injectable } from '@angular/core';
import { Habit, HabitView } from '../../../core/models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  
  // Banco de dados simulado (Mock inicial com histórico)
  private habits: Habit[] = [
    {
      id: '1', title: 'Beber água', color: '#1B31A8', lightColor: '#F2F5FF',
      type: 'recorrente', frequency: 'diario', completionType: 'numero', completionTarget: 0,
      notificationEnabled: true, createdAt: '2026-05-01',
      checkIns: [this.dateToString(new Date())] // Feito hoje
    },
    {
      id: '2', title: 'Ler um livro', color: '#FF5C5C', lightColor: '#FFEBEB',
      type: 'incremental', frequency: 'semanal', completionType: 'numero', completionTarget: 100,
      notificationEnabled: false, createdAt: '2026-05-01',
      checkIns: [] // Nenhum check-in ainda
    }
  ];

  constructor() { }

  // Função utilitária para normalizar datas ('YYYY-MM-DD')
  dateToString(date: Date): string {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split('T')[0];
  }

  // Gera a visualização dos hábitos para uma data ESPECÍFICA do calendário
  getHabitsForDate(selectedDate: Date): HabitView[] {
    const selectedDateStr = this.dateToString(selectedDate);

    return this.habits.map(habit => {
      const isDone = habit.checkIns.includes(selectedDateStr);
      const isInfinity = habit.type === 'recorrente';
      
      const { currentStreak, maxStreak } = this.calculateStreaks(habit, selectedDate);
      
      let progress = 0;
      if (isInfinity) {
        progress = isDone ? 100 : 0;
      } else {
        // Cálculo incremental baseado no total de check-ins x meta
        const totalDone = habit.checkIns.length;
        const target = Number(habit.completionTarget) || 1;
        progress = Math.min(100, Math.round((totalDone / target) * 100));
      }

      // Calcula dias restantes se for do tipo data
      let daysLeft: string | number = 'infinite';
      if (!isInfinity && habit.completionType === 'data' && habit.completionTarget) {
        const targetDate = new Date(habit.completionTarget);
        const diffTime = targetDate.getTime() - selectedDate.getTime();
        daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      } else if (!isInfinity && habit.completionType === 'numero') {
        daysLeft = `${habit.checkIns.length}/${habit.completionTarget}`;
      }

      return {
        ...habit,
        reminder: habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1),
        daysLeft: daysLeft,
        record: maxStreak,
        currentStreak: currentStreak,
        progressPercentage: progress,
        isInfinity: isInfinity,
        isDoneOnSelectedDate: isDone
      };
    });
  }

  // Adiciona um novo hábito
  addHabit(habitData: Habit) {
    this.habits.unshift(habitData);
  }

  // Faz ou desfaz o check-in em uma data específica
  toggleCheckIn(habitId: string, date: Date) {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) return;

    const dateStr = this.dateToString(date);
    const index = habit.checkIns.indexOf(dateStr);

    if (index > -1) {
      // Desfazer check-in
      habit.checkIns.splice(index, 1);
    } else {
      // Fazer check-in
      habit.checkIns.push(dateStr);
      
      // Verifica se atingiu 7 dias seguidos
      const { currentStreak } = this.calculateStreaks(habit, date);
      if (currentStreak > 0 && currentStreak % 7 === 0) {
        // Simula recompensa em Arestas (futuramente chamaria um ArestasService)
        setTimeout(() => alert(`🔥 Combo Perfeito! Você completou ${currentStreak} dias de "${habit.title}" e ganhou +50 arestas!`), 300);
      }
    }
  }

  // Calcula o streak retrocedendo a partir da data alvo
  private calculateStreaks(habit: Habit, targetDate: Date): { currentStreak: number, maxStreak: number } {
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    
    // Ordena as datas mais antigas para as mais novas
    const sortedCheckIns = [...habit.checkIns].sort(); 
    
    let previousDate: Date | null = null;

    for (const dateStr of sortedCheckIns) {
      const d = new Date(dateStr + 'T00:00:00'); // Força timezone local
      
      if (!previousDate) {
        tempStreak = 1;
      } else {
        const diffDays = Math.round((d.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++; // Dias consecutivos
        } else if (diffDays > 1) {
          tempStreak = 1; // Pulou dia, reseta a contagem
        }
      }
      
      if (tempStreak > maxStreak) maxStreak = tempStreak;
      previousDate = d;
      
      // Se a data de iteração é igual à data alvo ou ontem, atualiza o currentStreak
      const diffFromTarget = Math.round((targetDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diffFromTarget === 0 || diffFromTarget === 1) {
        currentStreak = tempStreak;
      } else if (diffFromTarget > 1) {
        // Se a última vez que fez foi há mais de 1 dia da data alvo, o streak atual estava zerado NAQUELA data
         currentStreak = 0;
      }
    }

    // Se o usuário não fez hoje nem ontem, o streak hoje é 0 (Reset Diário Automático)
    const todayStr = this.dateToString(targetDate);
    const yesterday = new Date(targetDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = this.dateToString(yesterday);

    if (!habit.checkIns.includes(todayStr) && !habit.checkIns.includes(yesterdayStr)) {
      currentStreak = 0;
    }

    return { currentStreak, maxStreak };
  }
}