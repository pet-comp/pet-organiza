import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutPage } from './main-layout.page';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('src/app/features/home/page/home.page').then(m => m.HomePage)
      },
      {
        path: 'tasks',
        loadComponent: () => import('src/app/features/tasks/task-list/page/task-list.page').then(m => m.TaskListPage)
      },
      {
        path: 'new-task',
        loadComponent: () => import('src/app/features/tasks/new-task/page/new-task.page').then(m => m.NewTaskPage)
      },
      {
        path: 'habits',
        loadComponent: () => import('src/app/features/habits/habit-list/page/habit-list.page').then(m => m.HabitListPage)
      },
      {
        path: 'missions',
        loadComponent: () => import('src/app/features/missions/mission-list/page/mission-list.page').then(m => m.MissionListPage)
      },
      {
        path: 'cubes',
        loadComponent: () => import('src/app/features/cubes/cubes-list/page/cubes-list.page').then(m => m.CubesListPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutPageRoutingModule {}
