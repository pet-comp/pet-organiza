import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'loader',
    loadComponent: () => import('./public/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./features/onboarding/onboarding.module').then(m => m.OnboardingModule)
  },
  {
    path: 'mainLayout',
    loadChildren: () => import('./features/layout/main-layout/main-layout.module').then( m => m.MainLayoutPageModule)
  },
  {
    path: 'cubes-list',
    loadChildren: () => import('./features/cubes/cubes-list/cubes-list.module').then( m => m.CubesListPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
