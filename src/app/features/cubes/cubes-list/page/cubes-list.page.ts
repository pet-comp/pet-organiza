import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CubeCardComponent } from '../cube-card/cube-card.component';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { Cube, CubeRarity } from 'src/app/core/models/cube.model';

interface UnlockQueueItem {
  cube: Cube;
  repeated: boolean;
  leveledUp: boolean;
}

@Component({
  selector: 'app-cubes-list',
  templateUrl: './cubes-list.page.html',
  styleUrls: ['./cubes-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CubeCardComponent, OrganizaButtonComponent],
})
export class CubesListPage implements OnInit {
  selectedCategory: string = 'todos';
  arestasSaldo: number = 1500;
  showUnlockCard: boolean = false;
  unlockedCube: Cube | null = null;
  unlockedCubeIsRepeated: boolean = false;
  unlockedCubeLeveledUp: boolean = false;
  cubes: Cube[] = [
    {
      id: 0,
      name: 'PET Computação',
      rarity: 'comuns',
      img: 'assets/cubes/cubo_pet_computacao.png',
      locked: false,
      xp: 0,
      level: 1,
      description: 'O cubo oficial do PET Computação. Movido a café, código limpo e projetos acadêmicos.',
      dateAcquired: '10/02/2026',
      buff: '+15% de XP em Tarefas de Estudos',
    },
    {
      id: 1,
      name: 'Cubo de Gelo',
      rarity: 'comuns',
      img: 'assets/cubes/ice.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Congela a procrastinação e mantém o foco absoluto em temperaturas abaixo de zero.',
      buff: '+10% de resistência contra adiamentos',
    },
    {
      id: 2,
      name: 'Cubo Gamer',
      rarity: 'comuns',
      img: 'assets/cubes/gamer.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Este cubo é o mestre dos jogos competitivos. Pronto para maratonar qualquer partida.',
      buff: '+10% de XP em Missões diárias',
    },
    {
      id: 3,
      name: 'Cubo Nerd',
      rarity: 'comuns',
      img: 'assets/cubes/nerd.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Devorador de livros e mestre das exatas. Sabe a resposta antes mesmo da pergunta.',
      buff: '+10% de XP em Hábitos intelectuais',
    },
    {
      id: 4,
      name: 'Cubo Punk',
      rarity: 'comuns',
      img: 'assets/cubes/punk.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Rebelde com causa! Quebra a rotina e desafia o tédio com acordes acelerados.',
      buff: '+10% de moedas ao completar tarefas',
    },
    {
      id: 5,
      name: 'Cubo Kids',
      rarity: 'comuns',
      img: 'assets/cubes/kids.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Cheio de energia e imaginação infinita. Transforma qualquer tarefa em brincadeira.',
      buff: '+5% de XP geral e +5% de moedas',
    },
    {
      id: 6,
      name: 'Cubo Bruxo',
      rarity: 'raros',
      img: 'assets/cubes/wizard.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Conjura feitiços de produtividade e poções mágicas para acelerar suas metas.',
      buff: '+20% de XP ao concluir tarefas à noite',
    },
    {
      id: 7,
      name: 'Clubo Penguin',
      rarity: 'lendarios',
      img: 'assets/cubes/penguin.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Direto da ilha mais gelada. Desliza pelas tarefas com elegância e muita nostalgia.',
      buff: '+25% de XP em sequências de hábitos',
    },
    {
      id: 8,
      name: 'Cubo Mágico',
      rarity: 'raros',
      img: 'assets/cubes/rubiks.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Um enigma de 6 faces e infinitas combinações. Resolve problemas com raciocínio rápido.',
      buff: '+15% de XP em hábitos lógicos',
    },
    {
      id: 9,
      name: 'Cubo Terrestre',
      rarity: 'lendarios',
      img: 'assets/cubes/earth.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Em perfeita sintonia com a natureza. Acalma a mente e traz estabilidade para o dia.',
      buff: '+30% de bônus em tarefas semanais',
    },
    {
      id: 10,
      name: 'Cube of Duty',
      rarity: 'epicos',
      img: 'assets/cubes/cube_of_duty.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Tático e disciplinado. Entra em operação para eliminar todas as pendências sem piedade.',
      buff: '+20% de precisão e XP em missões críticas',
    },
    {
      id: 11,
      name: 'Cubo Aquário',
      rarity: 'raros',
      img: 'assets/cubes/cubo_aquario.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Nada com calma nas águas da serenidade. Um mergulho refrescante na produtividade.',
      buff: '+15% de serenidade e recuperação de energia',
    },
    {
      id: 12,
      name: 'Cubo Soneca',
      rarity: 'raros',
      img: 'assets/cubes/cubo_soneca.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Sabe que o descanso faz parte da rotina. Um bom sono recarrega todas as energias.',
      buff: '+10% de bônus ao manter hábitos matinais',
    },
    {
      id: 13,
      name: 'Cubo Fantasma',
      rarity: 'raros',
      img: 'assets/cubes/cubo_fantasma.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Invisível para as distrações, atravessa prazos apertados sem deixar rastro.',
      buff: '+15% de esquiva contra penalidades',
    },
    {
      id: 14,
      name: 'Cubo Imersão',
      rarity: 'epicos',
      img: 'assets/cubes/cubo_imersao.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Foco profundo em realidade virtual. Desconecta do mundo exterior para criar coisas incríveis.',
      buff: '+25% de XP durante sessões de foco',
    },
    {
      id: 15,
      name: 'Cubo Medieval',
      rarity: 'raros',
      img: 'assets/cubes/cubo_medieval.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Forjado em batalhas épicas. Defende sua honra e completa missões com bravura.',
      buff: '+15% de defesa e perseverança',
    },
    {
      id: 16,
      name: 'Cubo Cowboy',
      rarity: 'raros',
      img: 'assets/cubes/cubo_cowboy.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'O atirador mais rápido do velho oeste na conclusão de tarefas ao pôr do sol.',
      buff: '+15% de velocidade ao concluir hábitos',
    },
    {
      id: 17,
      name: 'Cubo Tóxico',
      rarity: 'epicos',
      img: 'assets/cubes/cubo_toxico.svg',
      locked: true,
      xp: 0,
      level: 1,
      description: 'Radioativo de tanta produtividade e energia verde. Cuidado para não se queimar!',
      buff: '+20% de impulso tóxico em desafios',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToCubeView(cube: Cube) {
    if (!cube.locked) {
      this.router.navigate(['/cube-view'], { state: { cube } });
    }
  }

  get filteredCubes(): Cube[] {
    if (this.selectedCategory === 'todos') {
      return [...this.cubes].sort((a, b) => this.getRarityOrder(a.rarity) - this.getRarityOrder(b.rarity));
    }
    return this.cubes.filter(cube => cube.rarity === this.selectedCategory);
  }

  getRarityOrder(rarity: CubeRarity | string): number {
    switch (rarity) {
      case 'comuns': return 0;
      case 'raros': return 1;
      case 'epicos': return 2;
      case 'lendarios': return 3;
      default: return 4;
    }
  }

  rollRarity(): CubeRarity {
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

  rollPremiumRarity(): CubeRarity {
    const roll = Math.random() * 100;

    if (roll < 20) {
      return 'comuns';
    }

    if (roll < 60) {
      return 'raros';
    }

    if (roll < 90) {
      return 'epicos';
    }

    return 'lendarios';
  }

  unlockCube(isPremium: boolean = false) {
    let rarity: CubeRarity;
    if (isPremium) {
      rarity = this.rollPremiumRarity();
    } else {
      rarity = this.rollRarity();
    }

    const rarityCubes = this.cubes.filter(cube => cube.rarity === rarity);

    const randomIndex = Math.floor(Math.random() * rarityCubes.length);
    const newCube = rarityCubes[randomIndex];

    if (newCube.locked) {
      newCube.locked = false;
      const today = new Date().toLocaleDateString('pt-BR');
      newCube.dateAcquired = today;
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

  displayQueue: UnlockQueueItem[] = [];

  showUnlockAnimationForCube(cube: Cube, repeated: boolean = false, leveledUp: boolean = false) {
    this.displayQueue.push({ cube, repeated, leveledUp });

    if (!this.showUnlockCard) {
      this.showNextCubeFromQueue();
    }
  }

  showNextCubeFromQueue() {
    if (this.displayQueue.length > 0) {
      const next = this.displayQueue.shift();
      if (next) {
        this.unlockedCube = next.cube;
        this.unlockedCubeIsRepeated = next.repeated;
        this.unlockedCubeLeveledUp = next.leveledUp;
        this.showUnlockCard = true;
      }
    }
  }

  closeUnlockAnimation() {
    this.showUnlockCard = false;
    this.unlockedCube = null;
    this.unlockedCubeIsRepeated = false;
    this.unlockedCubeLeveledUp = false;

    setTimeout(() => {
      this.showNextCubeFromQueue();
    }, 150);
  }

  buyLargeBox() {
    for (let i = 0; i < 10; i++) {
      this.unlockCube();
    }
  }
}