import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { IonicModule } from '@ionic/angular';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CategoriesComponent }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoriesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class CategoriesModule { }
