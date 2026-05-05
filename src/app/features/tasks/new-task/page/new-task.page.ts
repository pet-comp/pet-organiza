import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaInputComponent } from 'src/app/shared/components/organiza-input/organiza-input.component';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  imports: [ CommonModule, FormsModule, IonicModule, OrganizaInputComponent, OrganizaButtonComponent],
  standalone: true,
})
export class NewTaskPage implements OnInit {

  priorities = ['Baixa', 'Normal', 'Urgente'];
  difficulties = ['Tranquila', 'Média', 'Difícil'];

  selectedCategory: string = '';
  selectedPriority: string = '';
  selectedDifficulty: string = '';
  selectedDate: string = '';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToTaskList() {
    this.router.navigate(['/mainLayout/tasks']);
  }

}
