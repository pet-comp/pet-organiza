import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HabitService } from '../services/habit.service'; // Importe o service

@Component({
  selector: 'app-habit-create',
  templateUrl: './habit-create.page.html',
  styleUrls: ['./habit-create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HabitCreatePage implements OnInit {
  
  habitName: string = '';
  selectedType: 'incremental' | 'recorrente' = 'incremental';
  selectedFrequency: 'diario' | 'semanal' | 'mensal' | 'anual' = 'diario';
  notificationEnabled: boolean = true;
  notificationTime: string = '07:00';
  availableColors: string[] = ['#f4c2ff', '#a0c4ff', '#ffadad', '#fdffb6', '#caffbf', '#c0c0c0'];
  selectedColor: string = '#f4c2ff';
  completionType: 'numero' | 'data' = 'numero';

  // Injete o HabitService no construtor
  constructor(private router: Router, private habitService: HabitService) { }

  ngOnInit() { }

  setType(type: 'incremental' | 'recorrente') { this.selectedType = type; }
  setFrequency(freq: 'diario' | 'semanal' | 'mensal' | 'anual') { this.selectedFrequency = freq; }
  setColor(color: string) { this.selectedColor = color; }
  setCompletionType(type: 'numero' | 'data') { this.completionType = type; }

  saveHabit() {
    if (!this.habitName.trim()) {
      alert('Por favor, dê um nome ao seu hábito!');
      return;
    }

    // Mapeando a frequência para o formato de lembrete do Card
    const reminderMap = {
      'diario': 'Diário',
      'semanal': 'Semanal',
      'mensal': 'Mensal',
      'anual': 'Anual'
    };

    // Salva o hábito via service
    this.habitService.addHabit({
      title: this.habitName,
      color: this.selectedColor,
      reminder: reminderMap[this.selectedFrequency],
      isInfinity: this.selectedType === 'recorrente'
    });

    // Limpa o form e volta para a tela principal
    this.habitName = '';
    this.router.navigate(['/mainLayout/habits']);
  }
}