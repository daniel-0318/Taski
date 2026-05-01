import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks.component').then( c => c.TasksComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.component').then( c => c.CategoriesComponent)
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
