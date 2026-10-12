import { Component, inject, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-organiza-task',
  templateUrl: './organiza-task.component.html',
  styleUrls: ['./organiza-task.component.scss'],
  imports: [IonicModule, FormsModule],
  standalone: true,
})
export class OrganizaTaskComponent {
  private authService = inject(AuthService);
  private firebaseService = inject(FirebaseService);

  @Input() task!: Task;

  async completeTask() {
    if (this.task.status === 'concluida') return;

    const uid = this.authService.getUid();
    if(!uid || !this.task.id) return;

    await this.firebaseService.concluirTask(uid, this.task.id);
    this.task.status = 'concluida';
  }
};
