import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { uid } from 'uid';

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
    const savedTasks = await this.storage.get<Task[]>(STORAGE_KEYS.TASKS) || [];
    const savedCategories = await this.storage.get<Category[]>(STORAGE_KEYS.CATEGORIES) || [];

    this.tasksSubject.next(savedTasks);
    this.categoriesSubject.next(savedCategories);
  }

  getTasks$(): Observable<Task[]> {
    return combineLatest([this.tasksSubject, this.categoriesSubject]).pipe(
      map(([tasks, categories]) => {
        return tasks.map(task => ({
          ...task,
          categoryName: categories.find(c => c.id === task.categoryId)?.name || 'Sin categoría',
          priorityName: categories.find(c => c.id === task.categoryId)?.priority || 'Sin prioridad'
        }))
      })
    );

  }

  getCategories$(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  async addTask(task: Task) {
    task.id = uid();
    const updatedTasks = [...this.tasksSubject.value, task];
    this.updateTasksState(updatedTasks);
  }

  async addCategory(category: Category) {
    category.id = uid();
    const updatedCategories = [...this.categoriesSubject.value, category];
    this.updateCategoriesState(updatedCategories);
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

  async deleteCategory(categoryId: string) {
    const updatedCategories = this.categoriesSubject.value.filter(category => category.id !== categoryId);
    this.updateCategoriesState(updatedCategories);
  }


  private async updateTasksState(tasks: Task[]) {
    this.tasksSubject.next(tasks);
    await this.storage.set(STORAGE_KEYS.TASKS, tasks);
  }

  private async updateCategoriesState(categories: Category[]) {
    this.categoriesSubject.next(categories);
    await this.storage.set(STORAGE_KEYS.CATEGORIES, categories);
  }

}
