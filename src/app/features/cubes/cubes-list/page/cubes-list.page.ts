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
  unlockedCubeLeveledUp: boolean = false;
  cubes = [
    { id: 0, name: 'PET Computação', rarity: 'comuns', img: 'assets/cubes/cubo_pet_computacao.png', locked: false, xp: 0, level: 1 },
    { id: 1, name: 'Cubo de Gelo', rarity: 'comuns', img: 'assets/cubes/ice.svg', locked: true, xp: 0, level: 1 },
    { id: 2, name: 'Cubo Gamer', rarity: 'comuns', img: 'assets/cubes/gamer.svg', locked: true, xp: 0, level: 1 },
    { id: 3, name: 'Cubo Nerd', rarity: 'comuns', img: 'assets/cubes/nerd.svg', locked: true, xp: 0, level: 1 },
    { id: 4, name: 'Cubo Punk', rarity: 'comuns', img: 'assets/cubes/punk.svg', locked: true, xp: 0, level: 1 },
    { id: 5, name: 'Cubo Kids', rarity: 'comuns', img: 'assets/cubes/kids.svg', locked: true, xp: 0, level: 1 },
    { id: 6, name: 'Cubo Bruxo', rarity: 'raros', img: 'assets/cubes/wizard.svg', locked: true, xp: 0, level: 1 },
    { id: 7, name: 'Clubo Penguin', rarity: 'lendarios', img: 'assets/cubes/penguin.svg', locked: true, xp: 0, level: 1 },
    { id: 8, name: 'Cubo Mágico', rarity: 'raros', img: 'assets/cubes/rubiks.svg', locked: true, xp: 0, level: 1 },
    { id: 9, name: 'Cubo Terrestre', rarity: 'lendarios', img: 'assets/cubes/earth.svg', locked: true, xp: 0, level: 1 },
    { id: 10, name: 'Cube of Duty', rarity: 'epicos', img: 'assets/cubes/cube_of_duty.svg', locked: true, xp: 0, level: 1 },
    { id: 11, name: 'Cubo Aquário', rarity: 'raros', img: 'assets/cubes/cubo_aquario.svg', locked: true, xp: 0, level: 1 },
    { id: 12, name: 'Cubo Soneca', rarity: 'raros', img: 'assets/cubes/cubo_soneca.svg', locked: true, xp: 0, level: 1 },
    { id: 13, name: 'Cubo Fantasma', rarity: 'raros', img: 'assets/cubes/cubo_fantasma.svg', locked: true, xp: 0, level: 1 },
    { id: 14, name: 'Cubo Imersão', rarity: 'epicos', img: 'assets/cubes/cubo_imersao.svg', locked: true, xp: 0, level: 1 },
    { id: 15, name: 'Cubo Medieval', rarity: 'raros', img: 'assets/cubes/cubo_medieval.svg', locked: true, xp: 0, level: 1 },
    { id: 16, name: 'Cubo Cowboy', rarity: 'raros', img: 'assets/cubes/cubo_cowboy.svg', locked: true, xp: 0, level: 1 },
    { id: 17, name: 'Cubo Tóxico', rarity: 'epicos', img: 'assets/cubes/cubo_toxico.svg', locked: true, xp: 0, level: 1 },
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
    const rarityCubes = this.cubes.filter(cube => cube.rarity === rarity);

    const randomIndex = Math.floor(Math.random() * rarityCubes.length);
    const newCube = rarityCubes[randomIndex];

    if (newCube.locked) {
      newCube.locked = false;
      this.showUnlockAnimationForCube(newCube);
      return;
    }

    newCube.xp += 100;
    let leveledUp = false;
    if (newCube.xp >= 1000) {
      newCube.xp = 0;
      newCube.level += 1;
      leveledUp = true;
    }
    this.showUnlockAnimationForCube(newCube, true, leveledUp);
  }

  showUnlockAnimationForCube(cube: any, repeated: boolean = false, leveledUp: boolean = false) {
    this.unlockedCube = cube;
    this.unlockedCubeIsRepeated = repeated;
    this.unlockedCubeLeveledUp = leveledUp;
    this.showUnlockCard = true;
  }

  closeUnlockAnimation() {
    this.showUnlockCard = false;
    this.unlockedCube = null;
    this.unlockedCubeIsRepeated = false;
    this.unlockedCubeLeveledUp = false;
  }
}