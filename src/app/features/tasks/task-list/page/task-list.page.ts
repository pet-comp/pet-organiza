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
import { map } from 'rxjs';

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

  mapPrioridade = new Map<string, number>([
    ["Baixa", 1],
    ["Normal", 2],
    ["Urgente", 3]
  ])

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

  private getPrazoTimestamp(prazo?: string): number {
    if (!prazo) return Infinity;
    const clean = prazo.trim().toLowerCase();
    if (!clean) return Infinity;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    if (clean === 'hoje') return today;
    if (clean === 'amanhã' || clean === 'amanha') return today + 24 * 60 * 60 * 1000;

    const isoMatch = clean.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      const year = parseInt(isoMatch[1], 10);
      const month = parseInt(isoMatch[2], 10) - 1;
      const day = parseInt(isoMatch[3], 10);
      return new Date(year, month, day).getTime();
    }

    const slashMatch = clean.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
    if (slashMatch) {
      const day = parseInt(slashMatch[1], 10);
      const month = parseInt(slashMatch[2], 10) - 1;
      const year = slashMatch[3] ? parseInt(slashMatch[3], 10) : now.getFullYear();
      return new Date(year, month, day).getTime();
    }

    const parsed = Date.parse(clean);
    return isNaN(parsed) ? Infinity : parsed;
  }

  private compareTasks(a: any, b: any): number {
    const timeA = this.getPrazoTimestamp(a.prazo);
    const timeB = this.getPrazoTimestamp(b.prazo);

    if (timeA !== timeB) {
      return timeA - timeB;
    }

    const pesoA = this.mapPrioridade.get(a.prioridade) ?? 0;
    const pesoB = this.mapPrioridade.get(b.prioridade) ?? 0;
    return pesoB - pesoA;
  }

  getTasksByCategory(categoryId: string) {
    const filtered = this.allTasks.filter(task => task.categoriaId === categoryId);
    filtered.sort((a, b) => {
      const pesoA = this.mapPrioridade.get(a.prioridade) ?? 0;
      const pesoB = this.mapPrioridade.get(b.prioridade) ?? 0;
      return pesoB - pesoA;
    });
    filtered.sort((a, b) => this.compareTasks(a, b));
    return filtered;
  }

  getCompletedTasksByCategory(categoryId: string) {
    return this.getTasksByCategory(categoryId).filter(task => task.status === 'concluida').length;
  }

  getTasksSemCategoria() {
    const categoryIds = this.categories.map(cat => cat.id);
    const filtered = this.allTasks.filter(task => !task.categoriaId || !categoryIds.includes(task.categoriaId));
    filtered.sort((a, b) => {
      const pesoA = this.mapPrioridade.get(a.prioridade) ?? 0;
      const pesoB = this.mapPrioridade.get(b.prioridade) ?? 0;
      return pesoB - pesoA;
    });
    filtered.sort((a, b) => this.compareTasks(a, b));
    return filtered;
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

  navigateToHomepage() {
    this.router.navigate(['/mainLayout']);
  }
}
