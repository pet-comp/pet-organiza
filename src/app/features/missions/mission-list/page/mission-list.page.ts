import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mission } from '../mission.model';
import { MissionCardComponent } from '../mission-card/mission-card.component';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.page.html',
  styleUrls: ['./mission-list.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, MissionCardComponent],
  standalone: true,
})

export class MissionListPage implements OnInit {
  selectedCategory: string = 'disponiveis';

  missions: Mission[] = [
    {
      title: 'Maratona de Estudos',
      description: 'Conclua 5 tarefas da categoria Estudos nesta semana.',
      arestas: 50,
      icon: 'book-outline',
      status: 'disponivel',
    },
    {
      title: 'Hábito de Ferro',
      description: 'Mantenha um hábito diário por 7 dias seguidos.',
      arestas: 100,
      icon: 'book-outline',
      status: 'disponivel',
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
