export type CubeRarity = 'comuns' | 'raros' | 'epicos' | 'lendarios';

export interface Cube {
  id: number;
  name: string;
  rarity: CubeRarity;
  img: string;
  locked: boolean;
  xp: number;
  level: number;
  description: string;
  dateAcquired?: string;
  buff: string;
}

