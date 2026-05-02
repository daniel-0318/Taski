import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../../core/services/data.service';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss'],
  standalone: false
})
export class CreateTasksComponent  implements OnInit {

  title = '';
  description = '';
  dueDate: string = '';

  constructor(private modalCtrl: ModalController, private dataService: DataService) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

  createTask() {
    if (!this.validateForm()) {
      return;
    }

    const newTask: Task = {
      id: '',
      title: this.title,
      description: this.description,
      dueDate: this.dueDate ? new Date(this.dueDate) : undefined,
      completed: false
    };
this.dataService.addTask(newTask);
    this.confirm();
  }

  validateForm(): boolean {
    return this.title.trim() !== '' && this.description.trim() !== '' && this.dueDate.trim() !== '';
  }

}
