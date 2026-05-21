import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { Mission } from '../mission.model';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss'],
  imports: [OrganizaButtonComponent, IonicModule],
  standalone: true,
})
export class MissionCardComponent {

  @Input() mission!: Mission;
  @Output() accept = new EventEmitter<Mission>();
  @Output() cancel = new EventEmitter<Mission>();
  @Output() complete = new EventEmitter<Mission>();

  constructor() { }

  onAccept() {
    this.accept.emit(this.mission);
  }

  onCancel() {
    this.cancel.emit(this.mission);
  }

  onComplete() {
    this.complete.emit(this.mission);
  }

}
