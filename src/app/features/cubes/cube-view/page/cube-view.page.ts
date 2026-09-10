import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { Cube } from 'src/app/core/models/cube.model';

@Component({
  selector: 'app-cube-view',
  templateUrl: './cube-view.page.html',
  styleUrls: ['./cube-view.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, OrganizaButtonComponent]
})
export class CubeViewPage implements OnInit {
  @Input() cube?: Cube;

  constructor(private router: Router, private navCtrl: NavController) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['cube']) {
      this.cube = nav.extras.state['cube'] as Cube;
    }
  }

  ngOnInit() {
    if (!this.cube && history.state && history.state.cube) {
      this.cube = history.state.cube as Cube;
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
