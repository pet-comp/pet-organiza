import { Component, inject, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
@Component({
  selector: 'app-organiza-task',
  templateUrl: './organiza-task.component.html',
  styleUrls: ['./organiza-task.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule, OrganizaButtonComponent],
  standalone: true,
})
export class OrganizaTaskComponent {
  private authService = inject(AuthService);
  private firebaseService = inject(FirebaseService);
  toastOpen = false;

  @Input() task!: Task;

  isExpanded: boolean = false;
  deleteCard: boolean = false;

  toggleDetails(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isExpanded = !this.isExpanded;
  }

  get formattedPrazo(): string {
    if (!this.task?.prazo) return '';
    const raw = this.task.prazo.trim();

    if (raw.toLowerCase() === 'hoje') return 'Hoje';
    if (raw.toLowerCase() === 'amanhã' || raw.toLowerCase() === 'amanha') return 'Amanhã';

    // Matches YYYY-MM-DD
    const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      const year = parseInt(isoMatch[1], 10);
      const month = parseInt(isoMatch[2], 10);
      const day = parseInt(isoMatch[3], 10);

      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const currentDay = now.getDate();

      if (year === currentYear && month === currentMonth && day === currentDay) {
        return 'Hoje';
      }

      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      if (year === tomorrow.getFullYear() && month === (tomorrow.getMonth() + 1) && day === tomorrow.getDate()) {
        return 'Amanhã';
      }

      return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`;
    }

    // Matches DD/MM or DD/MM/YYYY
    const slashMatch = raw.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
    if (slashMatch) {
      const day = parseInt(slashMatch[1], 10);
      const month = parseInt(slashMatch[2], 10);
      const year = slashMatch[3] ? parseInt(slashMatch[3], 10) : new Date().getFullYear();

      const now = new Date();
      if (year === now.getFullYear() && month === (now.getMonth() + 1) && day === now.getDate()) {
        return 'Hoje';
      }

      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      if (year === tomorrow.getFullYear() && month === (tomorrow.getMonth() + 1) && day === tomorrow.getDate()) {
        return 'Amanhã';
      }

      return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`;
    }

    return raw;
  }

  get priorityClass(): string {
    const prio = (this.task?.prioridade || '').toLowerCase().trim();
    if (prio.includes('urgente') || prio.includes('alta')) {
      return 'prio-urgente';
    }
    if (prio.includes('baixa')) {
      return 'prio-baixa';
    }
    return 'prio-normal';
  }

  get difficultyLevel(): number {
    const diff = (this.task?.dificuldade || '').toLowerCase().trim();
    if (diff.includes('fácil') || diff.includes('facil') || diff.includes('tranquila') || diff.includes('baixa')) {
      return 1;
    }
    if (diff.includes('difícil') || diff.includes('dificil') || diff.includes('alta')) {
      return 3;
    }
    return 2;
  }

  async changeTaskStatus() {
    const uid = this.authService.getUid();
    if (!uid || !this.task.id) return;

    if (this.task.status === 'concluida') {
      await this.firebaseService.desconcluirTask(uid, this.task.id);
      this.task.status = 'pendente';
    } else {
      await this.firebaseService.concluirTask(uid, this.task.id);
      this.task.status = 'concluida';
      this.exibirToast();
    }
  }

  showDeleteCard(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.deleteCard = true;
  }

  closeDeleteCard() {
    this.deleteCard = false;
  }

  async deleteTask() {
    this.closeDeleteCard();
  }

  // TODO: Implementar mensagem customizada para cada aresta de tarefas
  exibirToast() {
    this.toastOpen = true;
  }
}
