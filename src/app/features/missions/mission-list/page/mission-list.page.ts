import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mission } from '../mission.model';
import { MissionCardComponent } from '../mission-card/mission-card.component';
import { MissionCompletedComponent } from '../mission-completed/mission-completed.component';
import { MissionCancelComponent } from '../mission-cancel/mission-cancel.component';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.page.html',
  styleUrls: ['./mission-list.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, MissionCardComponent, MissionCompletedComponent, MissionCancelComponent],
  standalone: true,
})

export class MissionListPage implements OnInit {
  selectedCategory: string = 'disponivel';
  showCompletedCard: boolean = false;
  showCancelCard: boolean = false;
  completedMission?: Mission;
  canceledMission?: Mission;

  missions: Mission[] = [
    {
      title: 'Maratona de Estudos',
      description: 'Conclua 5 tarefas da categoria Estudos nesta semana.',
      arestas: 50,
      image: 'medal.png',
      status: 'disponivel',
      progress: 0,
    },
    {
      title: 'Hábito de Ferro',
      description: 'Mantenha um hábito diário por 7 dias seguidos.',
      arestas: 100,
      image: 'muscle.png',
      status: 'disponivel',
      progress: 0,
    },
    {
      title: 'Cozinheiro de mão cheia',
      description: 'Faça 3 receitas saudáveis essa semana.',
      arestas: 80,
      image: 'medal.png',
      status: 'disponivel',
      progress: 0,
    },
    {
      title: 'Explorador da Semana',
      description: 'Explore 3 novos lugares essa semana.',
      arestas: 100,
      image: 'medal.png',
      status: 'em progresso',
      progress: 100,
    },
    {
      title: 'Limpeza Total',
      description: 'Faça uma limpeza completa na casa.',
      arestas: 60,
      image: 'muscle.png',
      status: 'em progresso',
      progress: 30,
    },
    {
      title: 'Enfrentando a Cama',
      description: 'Arrume a cama logo ao acordar todos os dias desta semana.',
      arestas: 70,
      image: 'muscle.png',
      status: 'em progresso',
      progress: 60,
    },
  ]

  constructor() { }

  ngOnInit() { }

  get filteredMissions() {
    return this.missions.filter(mission => mission.status === this.selectedCategory);
  }

  acceptMission(mission: Mission) {
    mission.status = 'em progresso';
    mission.progress = 0;
  }

  cancelMission(mission: Mission) {
    if (mission.status === 'em progresso') {
      this.canceledMission = mission;
      this.showCancelCard = true;
    }
    else {
      this.missions = this.missions.filter(m => m !== mission);
    }
  }

  completeMission(mission: Mission) {
    this.missions = this.missions.filter(m => m !== mission);
    this.completedMission = mission;
    this.showCompletedCard = true;
  }

  closeCompletedCard() {
    this.showCompletedCard = false;
    this.completedMission = undefined;
  }

  closeCancelCard(confirm: boolean) {
    if (confirm) {
      this.missions = this.missions.filter(m => m !== this.canceledMission);
    }
    this.canceledMission = undefined;
    this.showCancelCard = false;
  }

}
