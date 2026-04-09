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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, OrganizaInputComponent, OrganizaButtonComponent]
})
export class RegisterPage implements OnInit {
  nome: string = ''; username: string = ''; nascimento: string = ''; email: string = ''; senha: string = '';
  constructor(private router: Router, private firebaseservice: FirebaseService, private alertcontroller: AlertController) { }

  async showAlert(titulo: string, mensagem: string) {
    const alert = await this.alertcontroller.create({header: titulo, message: mensagem, buttons: ['OK']});
    await alert.present();
  } 

  handleRegister() {
    if (!this.nome || !this.username || !this.nascimento || !this.email || !this.senha) {
      this.showAlert('Erro', 'Preencha todos os campos');
      return;
    }

    this.firebaseservice.register(this.nome, this.username, this.nascimento, this.email, this.senha)
      .then(async() => {
        console.log('Conta criada!');
        await this.showAlert('Sucesso', 'Conta criada!');
        this.router.navigate(['/auth/login']);
      }) .catch(err => {
        console.error('Erro no registro: ', err);

        if (err.code === 'auth/email-already-in-use') {
          this.showAlert('Erro', 'Email já está em uso');
        } else if (err.code === 'auth/invalid-email') {
          this.showAlert('Erro', 'Email inválido');
        } else if (err.code === 'auth/weak-password') {
          this.showAlert('Erro', 'Senha deve ter pelo menos 6 caracteres');
        } else {
          this.showAlert('Erro', 'Erro ao criar conta');
        }

      });
  }

  navigateToLogin() {
      this.router.navigate(['auth/login']);
  }

  ngOnInit() {
  }
}