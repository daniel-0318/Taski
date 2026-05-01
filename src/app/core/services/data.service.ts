import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants/storage.constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  constructor(private storage: StorageService) {
    this.init();
  }

  private async init() {
    const savedTasks = await this.storage.get<Task[]>(STORAGE_KEYS.TASKS) || [
      {
        id: '1',
        title: 'test',
        dueDate: new Date(),
        completed: false,
        categoryId: 'tech'
      },
      {
        id: '2',
        title: 'Comprar café',
        completed: true
      }
    ];
    const savedCategories = await this.storage.get<Category[]>(STORAGE_KEYS.CATEGORIES) || [];

    this.tasksSubject.next(savedTasks);
    this.categoriesSubject.next(savedCategories);
  }

  getTasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  async addTask(task: Task) {
    const updatedTasks = [...this.tasksSubject.value, task];
    this.updateTasksState(updatedTasks);
  }

  async toggleTask(taskId: string) {
    const updatedTasks = this.tasksSubject.value.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.updateTasksState(updatedTasks);
  }

  async deleteTask(taskId: string) {
    const updatedTasks = this.tasksSubject.value.filter(task => task.id !== taskId);
    this.updateTasksState(updatedTasks);
  }


  private async updateTasksState(tasks: Task[]) {
    this.tasksSubject.next(tasks);
    await this.storage.set(STORAGE_KEYS.TASKS, tasks);
  }

}
