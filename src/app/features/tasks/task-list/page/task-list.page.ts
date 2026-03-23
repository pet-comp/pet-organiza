import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      icone: "book-outline",
      colorHue: 288,
    },
    {
      id: "cat_2",
      name: "Saúde",
      icone: "pulse-outline",
      colorHue: 220,
    }
  ];

  todasAsTarefas = [
    { id: 't_1', name: 'Revisar lista de Álgebra Linear', completed: true, categoryId: 'cat_1' },
    { id: 't_2', name: 'Mandar e-mail pra graduação', completed: false, categoryId: 'cat_1' },
    { id: 't_3', name: 'Fazer a ata da reunião', completed: false, categoryId: 'cat_1' },
    { id: 't_4', name: 'Ir no médico da UPA', completed: false, categoryId: 'cat_2' }
  ];

  constructor() { }

  ngOnInit() {
  }

  getTasksByCategory(categoryId: string) {
    return this.todasAsTarefas.filter(task => task.categoryId === categoryId);
  }

  navigateToCreateTask() {
    console.log('Navigate to create task');
  }

  navigateToNewCategory() {
    console.log('Navigate to new category');
  }
}
