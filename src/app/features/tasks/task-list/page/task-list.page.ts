import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { AlertController, IonicModule, IonContent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { OrganizaButtonComponent } from '../../../../shared/components/organiza-button/organiza-button.component';
import { OrganizaTaskComponent } from '../organiza-task/organiza-task.component';
import { OrganizaCategoryCardComponent } from '../organiza-category-card/organiza-category-card.component';
import { OrganizaTaskGroupComponent } from '../organiza-task-group/organiza-task-group.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, OrganizaButtonComponent, OrganizaCategoryCardComponent, OrganizaTaskGroupComponent],
  standalone: true,
})
export class TaskListPage implements OnInit {
  private auth = inject(Auth);
  @ViewChild(IonContent) content!: IonContent;

  categories: any[] = [];
  allTasks: any [] = [];
  carregando: boolean = false;

  constructor(private router: Router, private firebaseservice: FirebaseService, private alertcontroller: AlertController) { }

  async showAlert(titulo: string, mensagem: string) {
    const alert = await this.alertcontroller.create({header: titulo, message: mensagem, buttons: ['OK']});
    await alert.present();
  }

  async carregarDados() {
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
    try{
      const [cats, tasks] = await Promise.all ([
        this.firebaseservice.buscarCategorias(uid), 
        this.firebaseservice.buscarTasks(uid)
      ]);
      this.categories = cats;
      this.allTasks = tasks;
    }finally{
      this.carregando = false;
    }
  }

  getTasksByCategory(categoryId: string) {
    const filtered = this.allTasks.filter(task => task.categoriaId === categoryId);
    return filtered;
  }

  getCompletedTasksByCategory(categoryId: string) {
    return this.getTasksByCategory(categoryId).filter(task => task.status === 'concluida').length;
  }

  getTasksSemCategoria() {
    const categoryIds = this.categories.map(cat => cat.id);
    return this.allTasks.filter(task => !task.categoriaId || !categoryIds.includes(task.categoriaId));
  }

  ionViewWillEnter() {
    this.content?.scrollToTop(0);
    this.carregarDados();
  }

  ngOnInit() {
  }

  navigateToCreateTask() {
    this.router.navigate(['/mainLayout/new-task']);
  }

  navigateToNewCategory() {
    this.router.navigate(['/mainLayout/new-category']);
  }
}
