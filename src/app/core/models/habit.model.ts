export interface Habit {
  id: string;
  title: string;
  color: string;
  lightColor: string;
  
  // Lógica Funcional
  type: 'incremental' | 'recorrente';
  frequency: 'diario' | 'semanal' | 'mensal' | 'anual';
  completionType: 'numero' | 'data';
  completionTarget?: number | string; // Ex: 100 (vezes) ou '2026-12-31'
  
  notificationEnabled: boolean;
  notificationTime?: string;
  
  createdAt: string; // 'YYYY-MM-DD'
  checkIns: string[]; // Array de datas 'YYYY-MM-DD' em que o hábito foi feito
}

// Interface auxiliar para a tela (View Model) calculada dinamicamente
export interface HabitView extends Habit {
  reminder: string;
  daysLeft: string | number;
  record: number; // Maior streak
  currentStreak: number; // Streak atual
  progressPercentage: number;
  isInfinity: boolean;
  isDoneOnSelectedDate: boolean; // Indica se foi feito na data selecionada
}