import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() { }

  async set(key: string, value: any): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error guardando en Storage', error);
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.error('Error leyendo de Storage', error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }

}