import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-organiza-category-card',
  templateUrl: './organiza-category-card.component.html',
  styleUrls: ['./organiza-category-card.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class OrganizaCategoryCardComponent {

  @Input() category: any;
  @Input() totalTasks: number = 0;
  @Input() completedTasks: number = 0;

  constructor() { }
}