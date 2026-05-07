import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaInputComponent } from 'src/app/shared/components/organiza-input/organiza-input.component';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { Auth } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  imports: [ CommonModule, FormsModule, IonicModule, OrganizaInputComponent, OrganizaButtonComponent],
  standalone: true,
})
export class NewTaskPage implements OnInit {
  private auth = inject(Auth);

  titulo: string = '';
  descricao: string = '';
  selectedCategory: string = '';
  selectedPriority: string = '';
  selectedDifficulty: string = '';
  selectedDate: string = '';

  priorities = ['Baixa', 'Normal', 'Urgente'];
  difficulties = ['Tranquila', 'Média', 'Difícil'];

  erros: {[key: string]: string} = {};
  tocado: {[key: string]: boolean} = {};

  categories = [
    {
      id: "cat_1",
      name: "Estudos",
      icon: "book-outline",
      colorHue: 288,
    },
    {
      id: "cat_2",
      name: "Saúde",
      icon: "pulse-outline",
      colorHue: 220,
    },
    {
      id: "cat_3",
      name: "Trabalho",
      icon: "briefcase-outline",
      colorHue: 0,
    },
    {
      id: "cat_4",
      name: "Exercício",
      icon: "barbell-outline",
      colorHue: 30,
    },
    {
      id: "cat_5",
      name: "Playstation",
      icon: "logo-playstation",
      colorHue: 230,
    }
  ];

  constructor(private router: Router, private firebaseservice: FirebaseService, private alertcontroller: AlertController) { }

  async showAlert(titulo: string, mensagem: string) {
    const alert = await this.alertcontroller.create({header: titulo, message: mensagem, buttons: ['OK']});
    await alert.present();
  }

  validarTitulo(titulo: string): string | null {
    if (!titulo.trim()) 
      return 'Título obrigatório.';
    if (titulo.trim().length < 3) 
      return 'Título deve ter pelo menos 3 caracteres.';
    if (titulo.trim().length > 100) 
      return 'Título deve ter no máximo 100 caracteres.';
    if (/[\u200B-\u200D\uFEFF\u3164\u1160]/.test(titulo)) 
      return 'Título contém caracteres inválidos.';
    return null;
  }

  validarDescricao(descricao: string): string | null {
    if (descricao.trim().length > 300) 
      return 'Descrição deve ter no máximo 300 caracteres.';
    if (/[\u200B-\u200D\uFEFF\u3164\u1160]/.test(descricao)) 
      return 'Descrição contém caracteres inválidos.';
    return null;
  }

  validarFormulario(): boolean {
    this.erros = {};
    const erroTitulo = this.validarTitulo(this.titulo);
    const erroDescricao = this.validarDescricao(this.descricao);

    if (erroTitulo) 
      this.erros['titulo'] = erroTitulo;
    if (erroDescricao) 
      this.erros['descricao'] = erroDescricao;

    if (!this.selectedDate) 
      this.erros['prazo'] = 'Prazo obrigatório.';
    if (!this.selectedPriority) 
      this.erros['prioridade'] = 'Prioridade obrigatória.';
    if (!this.selectedDifficulty) 
      this.erros['dificuldade'] = 'Dificuldade obrigatória.';

    return Object.keys(this.erros).length === 0;
  }

  //warning inline (dnv aqueles mini textos vermelhos de erro po)
  onTituloChange(valor: string) {
    this.titulo = valor;
    if (this.tocado['titulo'])
      this.erros['titulo'] = this.validarTitulo(valor) ?? '';
  }
  onTituloBlur() {
    this.tocado['titulo'] = true;
    this.erros['titulo'] = this.validarTitulo(this.titulo) ?? '';
  }

  onDescricaoChange(valor: string) {
    this.descricao = valor;
    if (this.tocado['descricao'])
      this.erros['descricao'] = this.validarDescricao(valor) ?? '';
  }
  onDescricaoBlur() {
    this.tocado['descricao'] = true;
    this.erros['descricao'] = this.validarDescricao(this.descricao) ?? '';
  }

  async handleSalvarTask() {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      this.showAlert('Erro', 'Usuário não autenticado.');
      return;
    }
    
    if(!this.validarFormulario()) {
      const aux = Object.keys(this.erros)[0];
      this.showAlert('Erro', this.erros[aux]);
      return;
    }

    try {
      await this.firebaseservice.criarTask(uid, {titulo: this.titulo.trim(), descricao: this.descricao.trim(), categoriaId: this.selectedCategory, prazo: this.selectedDate, prioridade: this.selectedPriority, dificuldade: this.selectedDifficulty});
      await this.showAlert('Sucesso', 'Tarefa criada com sucesso!');
      this.ngOnInit();
      this.router.navigate(['/mainLayout/tasks']);
    } catch (err) {
      this.showAlert('Erro', 'Erro ao salvar tarefa. Tente novamente.');
    }

  }

  ngOnInit() {
    this.titulo = ''; this.descricao = '';
    this.selectedCategory = ''; this.selectedPriority = '';
    this.selectedDifficulty = ''; this.selectedDate = '';
    this.erros = {}; this.tocado = {};
  }

  navigateToTaskList() {
    this.ngOnInit();
    this.router.navigate(['/mainLayout/tasks']);
  }

}
