import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { DataService } from 'src/app/core/services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateTasksComponent } from './create-tasks/create-tasks.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: false
})
export class TasksComponent implements OnInit {

  tasks$: Observable<Task[]>;

  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'secondary',
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      cssClass: 'primary',
    }
  ];

  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController, 
    private alertController: AlertController) {
    this.tasks$ = this.dataService.getTasks$();
  }

  ngOnInit() { }

  onIonInfinite(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async openAddTask() {
    const modal = await this.modalCtrl.create({
      component: CreateTasksComponent
    });
    modal.present();

  }

  async showAlert(id:string) {
    const alert = await this.alertController.create({
      header: '¿Eliminar tarea?',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: this.alertButtons,
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      this.deleteTask(id);
    }

  }

  deleteTask(taskId: string) {
    this.dataService.deleteTask(taskId);
  }

  toggleTask(taskId: string) {
    this.dataService.toggleTask(taskId);
  }

}
