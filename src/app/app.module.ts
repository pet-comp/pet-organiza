import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({
  apiKey: "AIzaSyCPDCaYSSf-o5Myq71RY5X9KwsTY3EKcQA",
  authDomain: "pet-organiza.firebaseapp.com",
  projectId: "pet-organiza",
  storageBucket: "pet-organiza.firebasestorage.app",
  messagingSenderId: "156099391045",
  appId: "1:156099391045:web:b2c8dee6abab6496d5bd2c",
  measurementId: "G-P0F5RL0W1R"
})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
    // projectNumber: "156099391045", version: "2"
    bootstrap: [AppComponent],
})

export class AppModule {}
