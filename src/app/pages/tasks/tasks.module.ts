import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateTasksComponent } from './create-tasks/create-tasks.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: TasksComponent }
];

@NgModule({
  declarations: [
    TasksComponent,
    CreateTasksComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class TasksModule { }
