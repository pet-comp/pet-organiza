import { Component, OnInit, NgZone } from '@angular/core';
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
  nome: string = ''; username: string = ''; nascimento: string = ''; email: string = ''; senha: string = ''; confirmarsenha: string = '';
  erros: {[key: string]: string} = {}; tocado: {[key: string]: boolean} = {}; 

  constructor(private router: Router, private firebaseservice: FirebaseService, private alertcontroller: AlertController, private ngZone: NgZone) { }

  async showAlert(titulo: string, mensagem: string): Promise<void> {
    return new Promise(async(resolve) => {
      const alert = await this.alertcontroller.create({header: titulo, message: mensagem, buttons: [{text: 'OK', handler: () => resolve()}] });
      await alert.present();
    });
  }

  validarNome(nome: string): string | null {
    const nomeLimpo = nome.trim();

    if (nomeLimpo.length < 8)
      return 'Nome completo inválido.';
    if (!/^[\p{L}\s'-]+$/u.test(nomeLimpo))
      return 'Nome completo deve conter apenas letras, espaços, hífens ou apóstrofos.';
    if (/[\u200B-\u200D\uFEFF\u3164\u1160]/.test(nomeLimpo))
      return 'Nome completo deve conter apenas letras, espaços, hífens ou apóstrofos.';
    if (!/\p{L}/u.test(nomeLimpo))
      return 'Nome completo deve conter pelo menos uma letra.';

    return null;
  }

  normalizarNome(nome: string): string {
    return nome
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/([-'])\1+/g, '$1')
      .replace(/\s*-\s*/g, '-')
      .replace(/\s*'\s*/g, "'");
  }

  validarUsername(username: string): string | null {
    const userLimpo = username.trim();
    const userLower = userLimpo.toLocaleLowerCase();
    const reservados = ['admin', 'root', 'support', 'system', 'administrator', 'moderator', 'staff'];

    if (!userLimpo) 
      return 'Nome de usuário obrigatório.';
    if (userLimpo.length < 3) 
      return 'Nome de usuário deve ter pelo menos 3 caracteres.';
    if (userLimpo.length > 20) 
      return 'Nome de usuário deve ter no máximo 20 caracteres.';
    if (!/^[a-zA-Z0-9_]+$/.test(userLimpo)) 
      return 'Nome de usuário só pode ter letras, números e underline.';
    if (/[\u200B-\u200D\uFEFF\u3164\u1160]/.test(username))
      return 'Nome de usuário só pode ter letras, números e underline.';
    if (!/[a-zA-Z]/.test(userLimpo)) 
      return 'Nome de usuário deve conter pelo menos uma letra.';
    if (reservados.includes(userLower)) 
      return 'Nome de usuário em uso.';
    
    return null;
  }

  validarNascimento(): string | null {
    const numeros = this.nascimento.replace(/\D/g, '');
    if (numeros.length < 8) 
      return 'Data de nascimento incompleta.';

    const dia = parseInt(numeros.slice(0,2));
    const mes = parseInt(numeros.slice(2,4));
    const ano = parseInt(numeros.slice(4,8));

    const data = new Date(ano, mes -1, dia);
    const anoAtual = new Date().getFullYear();

    if(data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia)
      return 'Data de nascimento inválida.';
    if(ano < anoAtual - 120 || ano >= anoAtual)
      return 'Data de nascimento fora do intervalo permitido.';

    return null;
  }

  formatarNascimento(valor: string) {
    const numeros = valor.replace(/\D/g, '').slice(0, 8);
    if (numeros.length <= 2)
      this.nascimento = numeros;
    else if (numeros.length <= 4)
      this.nascimento = `${numeros.slice(0,2)}/${numeros.slice(2)}`;
    else
      this.nascimento = `${numeros.slice(0,2)}/${numeros.slice(2,4)}/${numeros.slice(4)}`;
  }

  validarEmail(email: string): string | null {
    const emailLimpo = email.trim();

    if (!emailLimpo) 
      return 'Email obrigatório.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo))
      return 'Email inválido.';

    return null;
  }

  validarSenha(senha: string): string | null {
    if (!senha) 
      return 'Senha obrigatória.';
    if (senha.length < 8) 
      return 'Senha deve ter pelo menos 8 caracteres.';
    if (!/[A-Z]/.test(senha)) 
      return 'Senha deve ter pelo menos uma letra maiúscula.';
    if (!/[a-z]/.test(senha)) 
      return 'Senha deve ter pelo menos uma letra minúscula.';
    if (!/[0-9]/.test(senha)) 
      return 'Senha deve ter pelo menos um número.';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) 
      return 'Senha deve ter pelo menos um caractere especial.';
    return null;
  }

  validarFormulario(): boolean {
    this.erros = {};
    
    const erroNome = this.validarNome(this.nome);
    if (erroNome)
      this.erros['nome'] = erroNome;
    
    const erroUsername = this.validarUsername(this.username);
    if (erroUsername)
      this.erros['username'] = erroUsername;

    const erroNascimento = this.validarNascimento();
    if (erroNascimento)
      this.erros['nascimento'] = erroNascimento;

    const erroEmail = this.validarEmail(this.email);
    if (erroEmail)
      this.erros['email'] = erroEmail;

    const erroSenha = this.validarSenha(this.senha);
    if (erroSenha)
      this.erros['senha'] = erroSenha;
    else if (this.senha !== this.confirmarsenha)
      this.erros['confirmarsenha'] = 'Senhas não se coincidem.';

    return Object.keys(this.erros).length === 0;
  }


  onNomeChange(valor: string) {
  this.nome = valor;
  if (this.tocado['nome'])
    this.erros['nome'] = this.validarNome(valor) ?? '';
  }
  onNomeBlur() {
    this.tocado['nome'] = true;
    this.erros['nome'] = this.validarNome(this.nome) ?? '';
  }

  onUsernameChange(valor: string) {
    this.username = valor;
    if (this.tocado['username'])
      this.erros['username'] = this.validarUsername(valor) ?? '';
  }
  async onUsernameBlur() {
    this.tocado['username'] = true;
    const erroFormato = this.validarUsername(this.username);
    if (erroFormato) { this.erros['username'] = erroFormato; return; }
    const disponivel = await this.firebaseservice.usernameDisponivel(this.username);
    this.erros['username'] = disponivel ? '' : 'Nome de usuário em uso.';
  }

  onNascimentoChange(valor: string) {
  this.formatarNascimento(valor);
}
  onNascimentoBlur() {
    this.tocado['nascimento'] = true;
    if (!this.nascimento)
      this.erros['nascimento'] = 'Data de nascimento obrigatória.';
    else
      this.erros['nascimento'] = this.validarNascimento() ?? '';
  }

  onEmailChange(valor: string) {
    this.email = valor;
    if (this.tocado['email'])
      this.erros['email'] = this.validarEmail(valor) ?? '';
  }
  onEmailBlur() {
    this.tocado['email'] = true;
    this.erros['email'] = this.validarEmail(this.email) ?? '';
  }

  onSenhaChange(valor: string) {
  this.senha = valor;
    if (this.tocado['senha'])
      this.erros['senha'] = this.validarSenha(valor) ?? '';
    if (this.tocado['confirmarsenha'])
      this.erros['confirmarsenha'] = valor !== this.confirmarsenha ? 'Senhas não se coincidem.' : '';
  }
  onSenhaBlur() {
    this.tocado['senha'] = true;
    this.erros['senha'] = this.validarSenha(this.senha) ?? '';
  }

  onConfirmarSenhaChange(valor: string) {
    this.confirmarsenha = valor;
    if (this.tocado['confirmarsenha'])
      this.erros['confirmarsenha'] = this.senha !== valor ? 'Senhas não se coincidem.' : '';
  }
  onConfirmarSenhaBlur() {
    this.tocado['confirmarsenha'] = true;
    if (!this.confirmarsenha)
      this.erros['confirmarsenha'] = 'Confirmação de senha obrigatória.';
    else
      this.erros['confirmarsenha'] = this.senha !== this.confirmarsenha ? 'Senhas não se coincidem.' : '';
  }

  async handleRegister() {
    this.nome = this.normalizarNome(this.nome);
    this.username = this.username.trim();
    this.email = this.email.trim();

    if (!this.nome || !this.username || !this.nascimento || !this.email || !this.senha || !this.confirmarsenha) {
      this.showAlert('Erro', 'Preencha todos os campos');
      return;
    }

    if (!this.validarFormulario()) {
      const primeiraChave = Object.keys(this.erros)[0];
      this.showAlert('Erro', this.erros[primeiraChave]);
      return;
    }

    try {
      await this.firebaseservice.register(this.nome, this.username, this.nascimento, this.email, this.senha);
      await this.showAlert('Sucesso', 'Conta criada!');
      this.ngOnInit();
      this.ngZone.run(() => this.router.navigate(['/auth/login']));
    } catch (err: any) {
      if (err.code === 'username-already-in-use') {
        this.showAlert('Erro', 'Nome de usuário já está em uso.');
      } else if (err.code === 'auth/email-already-in-use') {
        this.showAlert('Erro', 'Email já está em uso.');
      } else if (err.code === 'auth/invalid-email') {
        this.showAlert('Erro', 'Email inválido.');
      } else {
        this.showAlert('Erro', 'Erro ao criar conta. Tente novamente.');
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }

  ngOnInit() {
    this.nome = ''; this.username = ''; this.nascimento = ''; this.email = ''; this.senha = ''; this.confirmarsenha = '';
    this.erros = {}; this.tocado = {};
  }
}