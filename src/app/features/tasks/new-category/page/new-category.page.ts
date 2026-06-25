import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { AlertController, IonicModule, IonContent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { OrganizaCategoryCardComponent } from '../../task-list/organiza-category-card/organiza-category-card.component';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  standalone: true,
  styleUrls: ['./new-category.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, OrganizaButtonComponent, OrganizaCategoryCardComponent]
})
export class NewCategoryPage implements OnInit {
  private auth = inject(Auth);
  @ViewChild(IonContent) content!: IonContent;

  erros: {[key:string]: string} = {};
  mostrarHuePicker: boolean = false;
  corPersonalizada: boolean = false;

  category = {
    name: '',
    descricao: '',
    icon: '',
    colorHue: 288,
  }

  constructor(private router: Router, private firebaseservice: FirebaseService, private alertcontroller: AlertController) { }

  async showAlert(titulo: string, mensagem: string) {
    const alert = await this.alertcontroller.create({header: titulo, message: mensagem, buttons: ['OK']});
    await alert.present();
  }

  validarname(name: string): string | null {
    if (!name.trim())
      return 'Nome da categoria obrigatório.';
    if (name.trim().length < 2)
      return 'Nome deve ter pelo menos 2 caracteres.';
    if (name.trim().length > 50)
      return 'Nome deve ter no máximo 50 caracteres.';
    if (/[\u200B-\u200D\uFEFF\u3164\u1160]/.test(name))
      return 'Nome contém caracteres inválidos.';
    return null;
  }

  validarDescricao(descricao: string): string | null {
    if (descricao.trim().length > 200)
      return 'Descrição deve ter no máximo 200 caracteres.';
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
    const erroname = this.validarname(this.category.name);
    const erroDescricao = this.validarDescricao(this.category.descricao);

    if (erroname)
      this.erros['name'] = erroname;
    if (erroDescricao)
      this.erros['descricao'] = erroDescricao;
    return Object.keys(this.erros).length === 0;
  }

  //warning inline (mais uma vez aqueles mini textos vermelhos de erro po)
  onNameChange(valor: string) {
    this.category.name = valor;
    this.erros['name'] = this.validarname(valor) ?? '';
  }
  onNameBlur() {
    this.erros['name'] = this.validarname(this.category.name) ?? '';
  }

  onDescricaoChange(valor: string) {
    this.category.descricao = valor;
    this.erros['descricao'] = this.validarDescricao(valor) ?? '';
  }

  //caixa de seleção de cor do "+"
  selecionarCor(hue: number) {
    this.category.colorHue = hue;
    this.corPersonalizada = false;
    this.mostrarHuePicker = false;
  }

  toggleHuePicker() {
    this.mostrarHuePicker = !this.mostrarHuePicker;
    if (this.mostrarHuePicker) {
      this.category.colorHue = 0;
      this.corPersonalizada = true;
    } else {
      this.corPersonalizada = false;
      this.category.colorHue = 288; // volta pro padrão
    }
  }

  onHueChange(valor: string) {
    this.category.colorHue = parseInt(valor);
  }

  async handleSalvarCategoria() {
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
      await this.firebaseservice.criarCategoria(uid, {name: this.category.name.trim(), descricao: this.category.descricao.trim(), icon: this.category.icon, colorHue: this.category.colorHue});
      await this.showAlert('Sucesso', 'Categoria criada com sucesso!');
      this.ngOnInit();
      this.router.navigate(['/mainLayout/tasks']);
    } catch (err) {
      this.showAlert('Erro', 'Erro ao salvar categoria. Tente novamente.');
    }
    
  }

  ionViewWillEnter() {
    this.content?.scrollToTop(0);
  }

  ngOnInit() {
    this.category = { name: '', descricao: '', icon: 'heart-outline', colorHue: 288 };
    this.erros = {};
    this.corPersonalizada = false; this.mostrarHuePicker = false;
  }
  
  setColor(hue: number) {
    this.category.colorHue = hue;
  }

  setIcon(name: string) {
    this.category.icon = `${name}-outline`
  }

  navigateToTaskList() {
    this.ngOnInit();
    this.router.navigate(['/mainLayout/tasks']);
  }

}
