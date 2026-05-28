export interface Category {
  id: string;
  name: string;
  icon: string;
  colorHue: number;
  ordem?: number;
  descricao?: string;
  semCategoria?: boolean;
}

export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  categoriaId: string;
  prazo: string;
  prioridade: string;
  dificuldade: string;
  status: string;
  recompensaPaga: boolean;
  criadaEm?: any;
}