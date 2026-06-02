import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CubeCardComponent } from '../cube-card/cube-card.component';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-cubes-list',
  templateUrl: './cubes-list.page.html',
  styleUrls: ['./cubes-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CubeCardComponent, OrganizaButtonComponent],
})
export class CubesListPage implements OnInit {
  selectedCategory: string = 'todos';
  arestasSaldo: number = 150;
  showUnlockCard: boolean = false;
  unlockedCube: any = null;
  unlockedCubeIsRepeated: boolean = false;
  cubes = [
    { id: 1, name: 'Cubo de Gelo', rarity: 'comuns', img: 'assets/cubes/ice.svg', locked: false },
    { id: 2, name: 'Cubo Gamer', rarity: 'comuns', img: 'assets/cubes/gamer.svg', locked: true },
    { id: 3, name: 'Cubo Nerd', rarity: 'comuns', img: 'assets/cubes/nerd.svg', locked: true },
    { id: 4, name: 'Cubo Punk', rarity: 'raros', img: 'assets/cubes/punk.svg', locked: true },
    { id: 5, name: 'Cubo Kids', rarity: 'comuns', img: 'assets/cubes/kids.svg', locked: true },
    { id: 6, name: 'Cubo Bruxo', rarity: 'epicos', img: 'assets/cubes/wizard.svg', locked: true },
    { id: 7, name: 'Clubo Penguin', rarity: 'lendarios', img: 'assets/cubes/penguin.svg', locked: true },
    { id: 8, name: 'Cubo Mágico', rarity: 'raros', img: 'assets/cubes/rubiks.svg', locked: true },
    { id: 9, name: 'Cubo Terrestre', rarity: 'lendarios', img: 'assets/cubes/earth.svg', locked: true },
    { id: 10, name: 'Cube of Duty', rarity: 'epicos', img: 'assets/cubes/cube_of_duty.svg', locked: true },
    { id: 11, name: 'Cubo Aquário', rarity: 'raros', img: 'assets/cubes/cubo_aquario.svg', locked: true },
    { id: 12, name: 'Cubo Soneca', rarity: 'raros', img: 'assets/cubes/cubo_soneca.svg', locked: true },
    { id: 13, name: 'Cubo Fantasma', rarity: 'raros', img: 'assets/cubes/cubo_fantasma.svg', locked: true },
    { id: 14, name: 'Cubo Imersão', rarity: 'epicos', img: 'assets/cubes/cubo_imersao.svg', locked: true },
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToCubeView(cube: any) {
    if (!cube.locked) {
      this.router.navigate(['/cube-view'], { state: { cube } });
    }
  }

  get filteredCubes() {
    if (this.selectedCategory === 'todos') return this.cubes.sort((a, b) => this.getRarityOrder(a.rarity) - this.getRarityOrder(b.rarity));
    return this.cubes.filter(cube => cube.rarity === this.selectedCategory);
  }

  getRarityOrder(rarity: string): number {
    switch (rarity) {
      case 'comuns': return 0;
      case 'raros': return 1;
      case 'epicos': return 2;
      case 'lendarios': return 3;
      default: return 4;
    }
  }

  rollRarity(): string {
    const roll = Math.random() * 100;

    if (roll < 55) {
      return 'comuns';
    }

    if (roll < 85) {
      return 'raros';
    }

    if (roll < 99) {
      return 'epicos';
    }

    return 'lendarios';

  }

  unlockCube() {
    const rarity = this.rollRarity();
    const rarityCubes = this.cubes.filter(cube => cube.locked && cube.rarity === rarity);

    if (rarityCubes.length === 0) {
      const repeatRarityCubes = this.cubes.filter(cube => cube.rarity === rarity);
      if (repeatRarityCubes.length > 0) {
        const randomIndex = Math.floor(Math.random() * repeatRarityCubes.length);
        const newCube = repeatRarityCubes[randomIndex];
        this.showUnlockAnimationForCube(newCube, true);
      }
      return;
    }

    const randomIndex = Math.floor(Math.random() * rarityCubes.length);
    const newCube = rarityCubes[randomIndex];

    newCube.locked = false;
    this.showUnlockAnimationForCube(newCube);
  }

  showUnlockAnimationForCube(cube: any, repeated: boolean = false) {
    this.unlockedCube = cube;
    this.unlockedCubeIsRepeated = repeated;
    this.showUnlockCard = true;
  }

  closeUnlockAnimation() {
    this.showUnlockCard = false;
    this.unlockedCube = null;
    this.unlockedCubeIsRepeated = false;
  }
}