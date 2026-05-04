import { Component, Input, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../../core/services/data.service';
import { Task } from '../../../core/models/task.model';
import { Category } from 'src/app/core/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss'],
  standalone: false
})
export class CreateTasksComponent implements OnInit {

  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    categoryId: '',
    completed: false
  }
  categories$: Observable<Category[]>;

  constructor(private modalCtrl: ModalController, private dataService: DataService) { 
    this.categories$ = this.dataService.getCategories$();
  }

  ngOnInit() { }

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
      title: this.task.title,
      description: this.task.description,
      dueDate: this.task.dueDate ? new Date(this.task.dueDate).toISOString() : '',
      categoryId: this.task.categoryId,
      completed: false
    };
    this.dataService.addTask(newTask);
    this.confirm();
  }

  updateTask() {
    if (!this.validateForm()) {
      return;
    }
    const updatedTask: Task = {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      dueDate: this.task.dueDate ? new Date(this.task.dueDate).toISOString() : '',
      categoryId: this.task.categoryId,
      completed: this.task.completed
    };
    this.dataService.updateTask(updatedTask);
    this.confirm();
  }

  validateForm(): boolean {
    return this.task.title.trim() !== ''
      && this.task.description.trim() !== ''
      && this.task.dueDate?.trim() !== ''
      && this.task.categoryId?.trim() !== '';
  }

}
