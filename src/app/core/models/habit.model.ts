export interface Habit {
  id: string;
  title: string;
  color: string;              // Cor principal (borda, texto, fundo inferior)
  lightColor: string;         // Cor clara para a barra de progresso superior
  reminder: string;           // Ex: "Diário", "Semanal", "Ter, Qui"
  daysLeft: string | number;  // Ex: 36, 140, ou 'infinite'
  record: number;             // Quantidade de dias do recorde
  progressPercentage: number; // De 0 a 100
  isInfinity: boolean;        // Exibe o ícone do infinito no lugar da %
}