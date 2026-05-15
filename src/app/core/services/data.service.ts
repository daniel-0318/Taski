import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { uid } from 'uid';
import { FirebaseStorageService } from './FirebaseStorage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  constructor(
    // private storage: StorageService, // para uso local con localStorage
    private storage: FirebaseStorageService
  ) {
    this.init();
  }

  private async init() {
    // para uso local con localStorage
    // const savedTasks = await this.storage.get<Task[]>(STORAGE_KEYS.TASKS) || [];
    // const savedCategories = await this.storage.get<Category[]>(STORAGE_KEYS.CATEGORIES) || [];
    const savedTasks = await this.storage.get<Task>(STORAGE_KEYS.TASKS) || [];
    const savedCategories = await this.storage.get<Category>(STORAGE_KEYS.CATEGORIES) || [];

    this.tasksSubject.next(savedTasks);
    this.categoriesSubject.next(savedCategories);
  }

  async defaultCategories() {
    // para uso local con localStorage
    // if (await this.storage.get(STORAGE_KEYS.CATEGORIESDEFAULTCREATED)) {
    //   return;
    // }
    const isCreated = await this.storage.getSetting(STORAGE_KEYS.CATEGORIESDEFAULTCREATED);
    if (isCreated) {
      return;
    }

    const defaultCategories: Category[] = [
      { id: uid(), name: 'Trabajo', priority: 'alta' },
      { id: uid(), name: 'Personal', priority: 'media' },
      { id: uid(), name: 'Hobby', priority: 'baja' },
    ];
    // const actual = this.categoriesSubject.value;
    // const finalList = [...actual, ...defaultCategories];
    // this.categoriesSubject.next(finalList);

    try {
      const savePromises = defaultCategories.map(cat =>
        this.storage.set(STORAGE_KEYS.CATEGORIES, cat.id, cat)
      );
      await Promise.all(savePromises);
      await this.storage.set('app_settings', STORAGE_KEYS.CATEGORIESDEFAULTCREATED, { value: true });
      this.categoriesSubject.next(defaultCategories);

    } catch (error) {
      console.error("Error creando categorías por defecto", error);
    }
  // para uso local con localStorage
  // await this.updateCategoriesState(finalList);
  // await this.storage.set(STORAGE_KEYS.CATEGORIESDEFAULTCREATED, true); 
  // await this.storage.set(STORAGE_KEYS.CATEGORIESDEFAULTCREATED, true);
}

getTasks$(): Observable < Task[] > {
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

getCategories$(): Observable < Category[] > {
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

  async updateCategory(updatedCategory: Category) {
  const updatedCategories = this.categoriesSubject.value.map(category => category.id === updatedCategory.id ? updatedCategory : category);
  this.updateCategoriesState(updatedCategories);
}

  async updateTask(updatedTask: Task) {
  const updatedTasks = this.tasksSubject.value.map(task => task.id === updatedTask.id ? updatedTask : task);
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

  async deleteCategory(categoryId: string) {
  const updatedCategories = this.categoriesSubject.value.filter(category => category.id !== categoryId);
  this.updateCategoriesState(updatedCategories);
}


  private async updateTasksState(tasks: Task[]) {
  this.tasksSubject.next(tasks);
  // await this.storage.set(STORAGE_KEYS.TASKS, tasks); // para uso local con localStorage
  for (const task of tasks) {
    await this.storage.set(STORAGE_KEYS.TASKS, task.id, task);
  }
}

  private async updateCategoriesState(categories: Category[]) {
  this.categoriesSubject.next(categories);
  // await this.storage.set(STORAGE_KEYS.CATEGORIES, categories); // para uso local con localStorage
  for (const category of categories) {
    await this.storage.set(STORAGE_KEYS.CATEGORIES, category.id, category);
  }
}

}
