import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private auth: Auth, private firestore: Firestore) {}

//ta, é o register q esta dando o erro de n aparecer, dps eu vou corrigir, pelo jeito era o addDoc travando a promise

  async register(nome: string, username: string, nascimento: string, email: string, senha: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
    const user = userCredential.user;

    const usersRef = collection(this.firestore, 'users');
    await addDoc(usersRef, {uid: user.uid, nome, username, nascimento, email});
    return user;
  }

  login(email: string, senha:string) {
    return signInWithEmailAndPassword(this.auth, email, senha);
  }

}
