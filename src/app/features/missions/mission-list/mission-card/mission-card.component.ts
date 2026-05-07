import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { Mission } from '../mission.model';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss'],
  imports: [OrganizaButtonComponent, IonIcon],
  standalone: true,
})
export class MissionCardComponent {

  @Input() mission!: Mission;

  constructor() { }

}
