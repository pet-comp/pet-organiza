import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaInputComponent } from '../../../../shared/components/organiza-input/organiza-input.component';
import { OrganizaButtonComponent } from '../../../../shared/components/organiza-button/organiza-button.component';
import { FirebaseService } from '../../../../services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, OrganizaInputComponent, OrganizaButtonComponent]
})
export class LoginPage implements OnInit {
  email: string = ''; senha: string = '';
  constructor(private router: Router, private firebaseservice: FirebaseService, private alertcontroller: AlertController) { }

  async showAlert(titulo: string, mensagem: string) {
    const alert = await this.alertcontroller.create({header: titulo, message: mensagem, buttons: ['OK']});
    await alert.present();
  } 

  handleLogin() {
  if (!this.email || !this.senha) {
    this.showAlert('Erro', 'Preencha os campos');
    return;
  }

  this.firebaseservice.login(this.email, this.senha)
    .then(() => {
      this.router.navigate(['/onboarding/carousel']);
    }) .catch(err => {
      
      if (err.code === 'auth/invalid-credential') {
        this.showAlert('Erro', 'Email ou senha incorretos');
      } else if (err.code === 'auth/invalid-email') {
        this.showAlert('Erro', 'Email inválido');
      } else {
        this.showAlert('Erro', 'Erro ao fazer login');
  }
    });
  }

  navigateToRegister() {
      this.router.navigate(['auth/register']);
  }

  ngOnInit() {
  }
}