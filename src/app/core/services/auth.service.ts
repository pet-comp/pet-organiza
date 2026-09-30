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
      });
    }
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
