import { Component, OnInit } from '@angular/core';
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

  title:string = '';
  description:string = '';
  dueDate: string = '';
  categoryId:string = '';
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
      title: this.title,
      description: this.description,
      dueDate: this.dueDate ? new Date(this.dueDate) : undefined,
      categoryId: this.categoryId,
      completed: false
    };
    this.dataService.addTask(newTask);
    this.confirm();
  }

  validateForm(): boolean {
    return this.title.trim() !== '' && this.description.trim() !== '' 
    && this.dueDate.trim() !== '' && this.categoryId.trim() !== '';
  }

}
