export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  birthDate?: string;
  collectionLevel: number;
  arestas: number;
  equippedCube?: string;
  avatarUrl?: string;
}

export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  habitReminders: boolean;
  soundEffects: boolean;
  language: string;
}

