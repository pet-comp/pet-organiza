import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OrganizaTaskComponent } from '../organiza-task/organiza-task.component';

@Component({
  selector: 'app-organiza-task-group',
  templateUrl: './organiza-task-group.component.html',
  styleUrls: ['./organiza-task-group.component.scss'],
  imports: [IonicModule, OrganizaTaskComponent],
  standalone: true
})
export class OrganizaTaskGroupComponent {

  @Input() category: any;
  @Input() taskList: any[] = [];

  constructor() { }

}
