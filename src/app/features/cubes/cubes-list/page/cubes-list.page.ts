import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CubeCardComponent } from '../cube-card/cube-card.component';
@Component({
  selector: 'app-cubes-list',
  templateUrl: './cubes-list.page.html',
  styleUrls: ['./cubes-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CubeCardComponent],
})
export class CubesListPage implements OnInit {
  selectedCategory: string = 'todos';
  arestasSaldo: number = 150;

  cubes = [
    { id: 1, name: 'de Gelo', rarity: 'comuns', img: 'assets/cubes/ice.svg', locked: false },
    { id: 2, name: 'Gamer', rarity: 'comuns', img: 'assets/cubes/gamer.svg', locked: false },
    { id: 3, name: 'Nerd', rarity: 'comuns', img: 'assets/cubes/nerd.svg', locked: false },
    { id: 4, name: 'Punk', rarity: 'raros', img: 'assets/cubes/punk.svg', locked: false },
    { id: 5, name: 'Kids', rarity: 'comuns', img: 'assets/cubes/kids.svg', locked: false },
    { id: 6, name: 'Bruxo', rarity: 'raros', img: 'assets/cubes/wizard.svg', locked: true },
    { id: 7, name: 'Penguin', rarity: 'lendarios', img: 'assets/cubes/penguin.svg', locked: true },
    { id: 8, name: 'Mágico', rarity: 'raros', img: 'assets/cubes/rubiks.svg', locked: true },
    { id: 9, name: 'Terrestre', rarity: 'lendarios', img: 'assets/cubes/earth.svg', locked: true },
  ];

  constructor() { }

  ngOnInit() {}

  get filteredCubes() {
    if (this.selectedCategory === 'todos') return this.cubes;
    return this.cubes.filter(cube => cube.rarity === this.selectedCategory);
  }
}