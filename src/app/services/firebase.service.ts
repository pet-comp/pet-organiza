import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, serverTimestamp, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  //Mecânicas de conta de usuário
  async register(nome: string, username: string, nascimento: string, email: string, senha: string) {
    return runInInjectionContext(this.injector, async () => {
      const usernameSnap = await getDoc(doc(this.firestore, 'usernames', username.toLowerCase()));
      if (usernameSnap.exists()) 
        throw { code: 'username-already-in-use' };

      const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(this.firestore, 'users', user.uid), {
        uid: user.uid, nome, username: username.toLowerCase(), nascimento, email, primeiroAcesso: true});

      await setDoc(doc(this.firestore, 'usernames', username.toLowerCase()), {
        uid: user.uid, email
      });

      return user;
    });
  }

  async login(identificador: string, senha: string) {
    return runInInjectionContext(this.injector, async () => {
      let email = identificador;

      if (!identificador.includes('@')) {
        const usernameSnap = await getDoc(
          doc(this.firestore, 'usernames', identificador.toLowerCase())
        );
        if (!usernameSnap.exists()) 
          throw { code: 'username-not-found' };
        
        email = usernameSnap.data()['email'];
      }
      return signInWithEmailAndPassword(this.auth, email, senha);
  });
  }

  async usernameDisponivel(username: string): Promise<boolean> {
    return runInInjectionContext(this.injector, async () => {
      const snap = await getDoc(doc(this.firestore, 'usernames', username.toLowerCase()));
      return !snap.exists();
    });
  }

  async primeiroAcesso(uid: string): Promise<boolean> {
    return runInInjectionContext(this.injector, async () => {  
      const snap = await getDoc(doc(this.firestore, 'users', uid));
      return snap.exists() ? snap.data()['primeiroAcesso'] : false;
    });
  }

  async tutorialVisto(uid: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      await updateDoc(doc(this.firestore, 'users', uid), {
        primeiroAcesso: false
      });
    });
  }


  //Mecânicas de Task
  async buscarTasks(uid: string): Promise<any[]> {
    return runInInjectionContext(this.injector, async () => {
      const tasksRef = collection(this.firestore, 'users', uid, 'tasks');
      const snap = await getDocs(tasksRef);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  async criarTask(uid: string, task: {titulo: string, descricao: string, categoriaId: string, prazo: string, prioridade: string, dificuldade: string}) {
    return runInInjectionContext(this.injector, async () => {
      const taskRef = collection(this.firestore, 'users', uid, 'tasks');
      await addDoc(taskRef, {
        ...task,
        status: 'pendente',
        recompensaPaga: false,
        criadaEm: serverTimestamp()
      });
    });
  }


  //Mecânicas de categorias
  async buscarCategorias(uid: string): Promise<any[]> {
    return runInInjectionContext(this.injector, async () => {
      const categoriasRef = collection(this.firestore, 'users', uid, 'categories');
      const snap = await getDocs(categoriasRef);
      const cats = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return cats.sort((a: any, b: any) => (a.ordem ?? 999) - (b.ordem ?? 999));
    });
  }

  async criarCategoriasDefault(uid: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const categoriasRef = collection(this.firestore, 'users', uid, 'categories');
      const snap = await getDocs(categoriasRef);
      const nomesExistentes = snap.docs.map(d => d.data()['name']);

      if (!nomesExistentes.includes('Estudos')) {
        await addDoc(categoriasRef, {
          name: 'Estudos', descricao: '', icon: 'book-outline',
          colorHue: 288, ordem: 0, criadaEm: serverTimestamp()
        });
      }
      if (!nomesExistentes.includes('Saúde')) {
        await addDoc(categoriasRef, {
          name: 'Saúde', descricao: '', icon: 'pulse-outline',
          colorHue: 220, ordem: 1, criadaEm: serverTimestamp()
        });
      }
    });
  }

  async criarCategoria(uid: string, categoria: {name: string, descricao: string, icon: string, colorHue: number}) {
    return runInInjectionContext(this.injector, async () => {
      const categoriaRef = collection(this.firestore, 'users', uid, 'categories');
      const snap = await getDocs(categoriaRef);
      const ordem = snap.size;

      await addDoc(categoriaRef, {
        ...categoria,
        ordem,
        criadaEm: serverTimestamp()
      });
    });
  }

  async atualizarOrdemCategorias(uid: string, categorias: any[]): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const promises = categorias.map((cat, index) =>
        updateDoc(doc(this.firestore, 'users', uid, 'categories', cat.id), {
          ordem: index
        })
      );
      await Promise.all(promises);
    });
  }

}