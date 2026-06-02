import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HabitService } from '../services/habit.service';
import { OrganizaInputComponent } from 'src/app/shared/components/organiza-input/organiza-input.component';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-habit-create',
  templateUrl: './habit-create.page.html',
  styleUrls: ['./habit-create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, OrganizaInputComponent, OrganizaButtonComponent]
})
export class HabitCreatePage implements OnInit {
  editingHabitId: string | null = null;
  habitName: string = '';
  selectedType: 'incremental' | 'recorrente' = 'incremental';
  selectedFrequency: 'diario' | 'semanal' | 'mensal' | 'anual' | 'personalizada' = 'diario';
  notificationEnabled: boolean = true;
  notificationTime: string = '07:00';
  availableColors: string[] = ['#f4c2ff', '#a0c4ff', '#ffadad', '#fdffb6', '#caffbf', '#c0c0c0'];
  selectedColor: string = '#f4c2ff';

  completionType: 'numero' | 'data' = 'numero';
  completionTargetNumber: number = 100;
  completionTargetDate: string = '';

  // Configurações da Frequência Customizada
  customFreqType: 'dias_semana' | 'intervalo' = 'dias_semana';
  customIntervalValue: number = 2;
  customIntervalUnit: 'dias' | 'semanas' | 'meses' | 'anos' = 'dias';

  customDays: number[] = [];
  weekDaysList = [
    { label: 'Segunda-feira', value: 1 },
    { label: 'Terça-feira', value: 2 },
    { label: 'Quarta-feira', value: 3 },
    { label: 'Quinta-feira', value: 4 },
    { label: 'Sexta-feira', value: 5 },
    { label: 'Sábado', value: 6 },
    { label: 'Domingo', value: 0 }
  ];

  constructor(
    private router: Router,
    private habitService: HabitService,
    private route: ActivatedRoute // Injetado aqui
  ) { }

  ngOnInit() {
    this.completionTargetDate = new Date().toISOString().split('T')[0];

    // Verifica se veio um ID na URL para modo edição
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.editingHabitId = params['id'];
        // Passamos diretamente o parâmetro garantido da URL
        const habit = this.habitService.getHabitById(params['id']);

        if (habit) {
          // Preenche o formulário com as informações do hábito existente
          this.habitName = habit.title;
          this.selectedColor = habit.color;
          this.selectedType = habit.type;
          // Se a frequência guardada não for um dos padrões, assume personalizada
          this.selectedFrequency = habit.frequency as any;
          this.completionType = habit.completionType;
          this.notificationEnabled = habit.notificationEnabled;
          this.notificationTime = habit.notificationTime || '07:00';
        }
      }
    });
  }

  navigateToHabitList() {
    this.router.navigate(['/mainLayout/habits']);
  }

  setType(type: 'incremental' | 'recorrente') { this.selectedType = type; }
  setColor(color: string) { this.selectedColor = color; }
  setCompletionType(type: 'numero' | 'data') { this.completionType = type; }

  setFrequency(freq: 'diario' | 'semanal' | 'mensal' | 'anual' | 'personalizada') {
    this.selectedFrequency = freq;
    if (freq !== 'personalizada') {
      this.customDays = [];
    }
  }

  setCustomFreqType(type: 'dias_semana' | 'intervalo') {
    this.customFreqType = type;
    this.selectedFrequency = 'personalizada';
  }

  toggleCustomDay(dayValue: number) {
    this.selectedFrequency = 'personalizada';
    const index = this.customDays.indexOf(dayValue);
    if (index > -1) {
      this.customDays.splice(index, 1);
    } else {
      this.customDays.push(dayValue);
    }
    this.customDays.sort((a, b) => a - b);
  }

  getCustomDaysLabel(): string {
    if (this.customFreqType === 'dias_semana') {
      if (this.customDays.length === 0) return 'Nenhum dia selecionado';
      const shortNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
      return this.customDays.map(d => shortNames[d]).join(', ');
    } else {
      const unitLabel = this.customIntervalValue === 1
        ? { dias: 'Dia', semanas: 'Semana', meses: 'Mês', anos: 'Ano' }[this.customIntervalUnit]
        : { dias: 'Dias', semanas: 'Semanas', meses: 'Meses', anos: 'Anos' }[this.customIntervalUnit];
      return `A cada ${this.customIntervalValue} ${unitLabel}`;
    }
  }

  onTimeChanged(event: any) {
    const datetimeValue = event.detail.value;
    if (datetimeValue) {
      const timeParts = datetimeValue.split('T');
      this.notificationTime = timeParts.length > 1 ? timeParts[1].substring(0, 5) : datetimeValue.substring(0, 5);
    }
  }

  saveHabit() {
    if (!this.habitName.trim()) {
      alert('Por favor, dê um nome ao seu hábito!');
      return;
    }

    if (this.editingHabitId) {
      // MODO EDIÇÃO: Atualiza a instância mestre preservando o histórico de check-ins existente!
      const existingHabit = this.habitService.getHabitById(this.editingHabitId);
      if (existingHabit) {
        existingHabit.title = this.habitName;
        existingHabit.color = this.selectedColor;
        existingHabit.lightColor = this.selectedColor + '33';
        existingHabit.type = this.selectedType;
        // Faz o mapeamento correto igual ao modo criação
        existingHabit.frequency = this.selectedFrequency === 'personalizada' ? 'semanal' : this.selectedFrequency;
        existingHabit.completionType = this.completionType;
        existingHabit.notificationEnabled = this.notificationEnabled;
        existingHabit.notificationTime = this.notificationTime;
      }
    } else {
      // MODO CRIAÇÃO PADRÃO: Cria um novo registro mestre
      this.habitService.addHabit({
        id: Date.now().toString(),
        title: this.habitName,
        color: this.selectedColor,
        lightColor: this.selectedColor + '33',
        type: this.selectedType,
        frequency: this.selectedFrequency === 'personalizada' ? 'semanal' : this.selectedFrequency,
        completionType: this.completionType,
        completionTarget: this.completionType === 'numero' ? this.completionTargetNumber : this.completionTargetDate,
        notificationEnabled: this.notificationEnabled,
        notificationTime: this.notificationTime,
        createdAt: new Date().toISOString().split('T')[0],
        checkIns: []
      });
    }

    this.habitName = '';
    this.editingHabitId = null;
    this.router.navigate(['/mainLayout/habits']);
  }
}