import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizaButtonComponent } from '../../../../shared/components/organiza-button/organiza-button.component';
import { OrganizaTaskComponent } from '../organiza-task/organiza-task.component';
import { OrganizaCategoryCardComponent } from '../organiza-category-card/organiza-category-card.component';
import { OrganizaTaskGroupComponent } from '../organiza-task-group/organiza-task-group.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, OrganizaButtonComponent, OrganizaTaskComponent, OrganizaCategoryCardComponent, OrganizaTaskGroupComponent],
  standalone: true,
})
export class TaskListPage implements OnInit {

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

  allTasks = [
    { id: 't_1', name: 'Revisar lista de Álgebra Linear', completed: true, categoryId: 'cat_1' },
    { id: 't_2', name: 'Mandar e-mail pra graduação', completed: false, categoryId: 'cat_1' },
    { id: 't_3', name: 'Fazer a ata da reunião', completed: false, categoryId: 'cat_1' },
    { id: 't_4', name: 'Ir no médico da UPA', completed: false, categoryId: 'cat_2' },
    { id: 't_5', name: 'Tomar remédio', completed: false, categoryId: 'cat_2' },
    { id: 't_6', name: 'Participar da reunião de trabalho', completed: false, categoryId: 'cat_3' },
    { id: 't_7', name: 'Criar o novo endpoint', completed: false, categoryId: 'cat_3' },
    { id: 't_8', name: 'Cobrar salário atrasado', completed: false, categoryId: 'cat_3' },
    { id: 't_9', name: 'Ir à academia', completed: false, categoryId: 'cat_4' },
    { id: 't_10', name: 'Correr 15km', completed: false, categoryId: 'cat_4' },
    { id: 't_11', name: 'Fazer Terra com 425kg', completed: false, categoryId: 'cat_4' },
    { id: 't_12', name: 'Jogar Division Rivals semanal no FIFA', completed: false, categoryId: 'cat_5' },
    { id: 't_13', name: 'Farmar 5.000.000 no GTA', completed: false, categoryId: 'cat_5' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getTasksByCategory(categoryId: string) {
    return this.allTasks.filter(task => task.categoryId === categoryId);
  }

  getCompletedTasksByCategory(categoryId: string) {
    return this.getTasksByCategory(categoryId).filter(task => task.completed).length;
  }

  navigateToCreateTask() {
    this.router.navigate(['/mainLayout/new-task']);
  }

  navigateToNewCategory() {
    console.log('Navigate to new category');
  }
}
