import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Mission } from '../mission.model';
import { OrganizaButtonComponent } from '../../../../shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-mission-completed',
  templateUrl: './mission-completed.component.html',
  styleUrls: ['./mission-completed.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, OrganizaButtonComponent]
})
export class MissionCompletedComponent {

  @Input() mission!: Mission;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  onClose() {
    this.close.emit();
  }
}
