import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { OrganizaInputComponent } from 'src/app/shared/components/organiza-input/organiza-input.component';
import { UserProfile, AppSettings } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizaButtonComponent,
    OrganizaInputComponent
  ]
})
export class ProfilePage implements OnInit {
  user: UserProfile = {
    id: 'user_01',
    name: 'Inserir Texto',
    username: 'inserir.texto',
    email: 'inserir.texto@email.com',
    birthDate: '15/05/2002',
    collectionLevel: 5,
    arestas: 1500,
    equippedCube: 'Clubo Penguin',
    avatarUrl: 'assets/cubes/penguin.svg'
  };

  settings: AppSettings = {
    darkMode: false,
    notifications: true,
    habitReminders: true,
    soundEffects: true,
    language: 'Português (BR)'
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.navCtrl.back();
  }

  async saveChanges(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Informações atualizadas com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  async confirmLogout(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Encerrar Sessão',
      message: 'Tem certeza que deseja sair da sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          role: 'destructive',
          handler: () => {
            this.handleLogout();
          }
        }
      ]
    });

    await alert.present();
  }

  handleLogout(): void {
    this.router.navigate(['/auth/login']);
  }

  async openAvatarSelector(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Acesse a Coleção de Cubos para escolher seu avatar!',
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }
}

