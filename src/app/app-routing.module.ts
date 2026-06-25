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
    loadComponent: () => import('./public/loader/loader.page').then(m => m.LoaderPage)
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
    loadChildren: () => import('./features/layout/main-layout/main-layout.module').then(m => m.MainLayoutPageModule)
  },
  {
    path: 'habit-create',
    loadChildren: () => import('./features/habits/habit-create/habit-create.module').then(m => m.HabitCreatePageModule)
  },
  {
    path: 'cube-view',
    loadChildren: () => import('./features/cubes/cube-view/cube-view.module').then(m => m.CubeViewPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
