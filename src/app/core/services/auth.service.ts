// Serviço de autenticação (login, logout)
import { Injectable, signal, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { UserProfile } from '../models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { isToday, getLocalTodayString } from '../utils/date.utils';

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

  getUid(): string | null {
    return this.currentUser()?.id || this.auth.currentUser?.uid || null;
  }

  async waitForUid(): Promise<string | null> {
    const existingUid = this.getUid();
    if (existingUid) return existingUid;

    return new Promise<string | null>((resolve) => {
      const unsub = this.auth.onAuthStateChanged((user) => {
        unsub();
        resolve(user?.uid ?? null);
      });
    });
  }

  async carregarUsuario(uid: string) {
    const dados = await this.firebaseService.buscarPerfil(uid);
    if (dados) {
      // Verifica se a recompensa foi resgatada hoje (considerando o fuso horário local)
      const jaRecebeuHoje =
        isToday(dados.lastDailyRewardDate) && dados.dailyReward === true;

      // Se no Firestore dailyReward estiver true mas a data for de outro dia,
      // reseta no Firestore para manter o documento consistente com o novo dia.
      if (dados.dailyReward === true && !jaRecebeuHoje) {
        this.firebaseService.atualizarUsuario(uid, { dailyReward: false });
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
    const hoje = getLocalTodayString();

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
