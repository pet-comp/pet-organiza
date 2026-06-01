import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cube-card',
  templateUrl: './cube-card.component.html',
  styleUrls: ['./cube-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CubeCardComponent  implements OnInit {
  @Input() cube: any;

  constructor() { }

  ngOnInit() {}

}
