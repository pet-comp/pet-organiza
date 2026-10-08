// Serviço de autenticação (login, logout)
import { Injectable, signal, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { UserProfile } from '../models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firebaseService = inject(FirebaseService);

  // Estado global usuário
  currentUser = signal<UserProfile | null>(null);

  constructor() {
    authState(this.auth).subscribe(async (user) => {
        if (user) {
            await this.carregarUsuario(user.uid);
        } else {
            this.currentUser.set(null);
        }
    });
  }

  async carregarUsuario(uid: string) {
    const dados = await this.firebaseService.buscarPerfil(uid);
    if (dados) {
      const hoje = new Date().toISOString().split('T')[0];
      let jaRecebeuHoje = false;

      if (dados.lastDailyRewardDate) {
        jaRecebeuHoje =
          dados.lastDailyRewardDate === hoje && dados.dailyReward === true;
      } else {
        jaRecebeuHoje = dados.dailyReward === true;
      }

      this.currentUser.set({
        id: uid,
        name: dados.nome || dados.name,
        username: dados.username,
        email: dados.email,
        birthDate: dados.nascimento,
        collectionLevel: dados.collectionLevel ?? 1,
        arestas: dados.arestas ?? 0,
        equippedCube: dados.equippedCube,
        avatarUrl: dados.avatarUrl ?? 'assets/cubes/cubo_pet_computacao.png',
        dailyReward: jaRecebeuHoje,
        lastDailyRewardDate: dados.lastDailyRewardDate,
      });
    }
  }

  // Resgata a recompensa diária de arestas
  async resgatarRecompensaDiaria(arestas: number = 12): Promise<void> {
    const user = this.currentUser();
    if (!user) return;

    const novasArestas = (user.arestas ?? 0) + arestas;
    const hoje = new Date().toISOString().split('T')[0];

    await this.firebaseService.resgatarRecompensaDiaria(user.id, arestas);

    this.atualizarDadosLocais({
      dailyReward: true,
      lastDailyRewardDate: hoje,
      arestas: novasArestas,
    });
  }

  // Atualiza os dados do estado global localmente
  atualizarDadosLocais(novosDados: Partial<UserProfile>) {
    this.currentUser.update((user) =>
      user ? { ...user, ...novosDados } : null,
    );
  }

  // Limpa os dados, usar no logout
  logout() {
    this.currentUser.set(null);
  }
}
