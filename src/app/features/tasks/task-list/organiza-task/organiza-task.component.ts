import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';

@Component({
  selector: 'app-organiza-task',
  templateUrl: './organiza-task.component.html',
  styleUrls: ['./organiza-task.component.scss'],
  imports: [IonicModule, FormsModule],
  standalone: true
})
export class OrganizaTaskComponent {

  @Input() task!: Task;

  constructor() { }

  toogleCompleted() {
    this.task.completed = !this.task.completed;
  }
}
