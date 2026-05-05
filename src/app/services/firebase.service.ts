import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async register(nome: string, username: string, nascimento: string, email: string, senha: string) {
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
  }

  async login(identificador: string, senha: string) {
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
  }

  async usernameDisponivel(username: string): Promise<boolean> {
    const snap = await getDoc(doc(this.firestore, 'usernames', username.toLowerCase()));
    return !snap.exists();
  }

  async primeiroAcesso(uid: string): Promise<boolean> {
    const snap = await getDoc(doc(this.firestore, 'users', uid));
    return snap.exists() ? snap.data()['primeiroAcesso'] : false;
  }

  async tutorialVisto(uid: string): Promise<void> {
    await updateDoc(doc(this.firestore, 'users', uid), {
      primeiroAcesso: false
    });
  }

  async criarTask(uid: string, task: {titulo: string, descricao: string, categoriaId: string, prazo: string, prioridade: string, dificuldade: string}) {
    const taskRef = collection(this.firestore, 'users', uid, 'tasks');
    await addDoc(taskRef, {
      ...task,
      status: 'pendente',
      recompensaPaga: false,
      criadaEm: serverTimestamp()
    });
  }

}