import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'carousel',
    pathMatch: 'full'
  },
  {
    path: 'carousel',
    loadComponent: () => import('./pages/carousel/carousel.page').then( m => m.CarouselPage)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }