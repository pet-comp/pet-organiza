import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Mission } from '../mission.model';

@Component({
  selector: 'app-mission-cancel',
  templateUrl: './mission-cancel.component.html',
  styleUrls: ['./mission-cancel.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MissionCancelComponent {
  @Input() mission?: Mission;
  @Output() close = new EventEmitter<boolean>();

  onConfirm() {
    this.close.emit(true);
  }

  onCancel() {
    this.close.emit(false);
  }
}
