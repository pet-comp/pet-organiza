// carousel.page.ts (VERSÃO FINAL E CORRIGIDA)

import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.page.html',
  styleUrls: ['./carousel.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselPage implements OnInit, AfterViewInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  slides = [
    {
      image: 'assets/onboarding-1.svg',
      title: 'Organização',
      description: 'Planeje seus objetivos e gerencie hábitos'
    },
    {
      image: 'assets/onboarding-2.svg',
      title: 'Praticidade',
      description: 'Centralize seus afazeres em um único lugar'
    },
    {
      image: 'assets/onboarding-3.svg',
      title: 'Motivação',
      description: 'Complete tarefas e ganhe cubos!'
    }
  ];

  currentIndex = 0;

  constructor(private router: Router, private zone: NgZone) {}

  ngOnInit() {}

  // ngAfterViewInit é chamado depois que a view (e o #swiper) é inicializada
  ngAfterViewInit() {
  this.swiperRef?.nativeElement.addEventListener('swiperslidechange', (event: any) => {
    const [swiper] = event.detail;
    this.zone.run(() => {
      this.currentIndex = swiper.activeIndex;
    });
  });
}

  next(swiperEl: any) {
    swiperEl.swiper.slideNext();
  }

  finish() {
    this.router.navigate(['/auth/login']);
  }
}