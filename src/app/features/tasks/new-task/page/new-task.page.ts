import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { AlertController, IonicModule, IonContent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { OrganizaInputComponent } from 'src/app/shared/components/organiza-input/organiza-input.component';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  imports: [ CommonModule, FormsModule, IonicModule, OrganizaButtonComponent],
  standalone: true,
})
export class NewTaskPage implements OnInit {
  private auth = inject(Auth);
  @ViewChild(IonContent) content!: IonContent;

  titulo: string = '';
  descricao: string = '';
  selectedCategory: string = '';
  selectedPriority: string = '';
  selectedDifficulty: string = '';
  selectedDate: string = '';

  priorities = ['Baixa', 'Normal', 'Urgente'];
  difficulties = ['Tranquila', 'Média', 'Difícil'];

  carregando: boolean = false;
  erros: {[key: string]: string} = {};
  tocado: {[key: string]: boolean} = {};

  prazoMin: string = new Date(new Date().getFullYear() - 5, 0, 1).toISOString();
  prazoMax: string = new Date(new Date().getFullYear() + 20, 11, 31).toISOString();

  categories: any[] = [];

  constructor(private router: Router, private firebaseservice: FirebaseService, private alertcontroller: AlertController) { }

  async showAlert(titulo: string, mensagem: string) {
    const alert = await this.alertcontroller.create({header: titulo, message: mensagem, buttons: ['OK']});
    await alert.present();
  }

  async carregarCategorias() {
    const uid = await new Promise<string | null>((resolve) => {
      const unsub = this.auth.onAuthStateChanged(user => {
        unsub();
        resolve(user?.uid ?? null);
      });
    });

    if (!uid) {
      await this.showAlert('Erro', 'Sessão expirada. Faça login novamente.');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.carregando = true;
    try { 
      this.categories = await this.firebaseservice.buscarCategorias(uid);
    } finally {
      this.carregando = false;
    }
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

  autoResize(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
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

    this.tocado['titulo'] = true;
    this.tocado['descricao'] = true;
    this.tocado['prazo'] = true;
    this.tocado['prioridade'] = true;
    this.tocado['dificuldade'] = true;

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
    const uid = await new Promise<string | null>((resolve) => {
      const unsub = this.auth.onAuthStateChanged(user => {
        unsub();
        resolve(user?.uid ?? null);
      });
    });

    if (!uid) {
      await this.showAlert('Erro', 'Sessão expirada. Faça login novamente.');
      this.router.navigate(['/auth/login']);
      return;
    }
    
    if(!this.validarFormulario()) {
      const aux = Object.keys(this.erros)[0];
      this.showAlert('Erro', this.erros[aux]);
      return;
    }

    try {
    await this.firebaseservice.criarTask(uid, {titulo: this.titulo.trim(), descricao: this.descricao.trim(), categoriaId: this.selectedCategory, prazo: this.selectedDate, prioridade: this.selectedPriority, dificuldade: this.selectedDifficulty, });
    await this.showAlert('Sucesso', 'Tarefa criada com sucesso!');
    this.ngOnInit();
    this.router.navigate(['/mainLayout/tasks']);
  } catch (err) {
    this.showAlert('Erro', 'Erro ao salvar tarefa. Tente novamente.');
  }

  }

  ngOnInit() {
    this.titulo = ''; this.descricao = '';
    this.selectedCategory = ''; this.selectedPriority = ''; this.selectedDifficulty = ''; this.selectedDate = '';
    this.erros = {}; this.tocado = {};
  }

  ionViewWillEnter() {
    this.content?.scrollToTop(0);
    this.carregarCategorias();
  }
  
  navigateToTaskList() {
    this.ngOnInit();
    this.router.navigate(['/mainLayout/tasks']);
  }

}
