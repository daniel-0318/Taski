import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {

  constructor(private firestore: Firestore) { }

  async set(collectionName: string, id: string, value: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, collectionName, id);
      await setDoc(docRef, value);
    } catch (error) {
      console.error(`Error guardando en ${collectionName}`, error);
      throw error;
    }
  }

  async get<T>(collectionName: string): Promise<T[]> {
    try {
      const colRef = collection(this.firestore, collectionName);
      const querySnapshot = await getDocs(colRef);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { ...data } as T;
      });
    } catch (error) {
      console.error(`Error leyendo colección ${collectionName}`, error);
      return [];
    }
  }

  async remove(collectionName: string, id: string): Promise<void> {
    const docRef = doc(this.firestore, collectionName, id);
    await deleteDoc(docRef);
  }

  async getSetting(key: string): Promise<any> {
    try {
      const docRef = doc(this.firestore, 'app_settings', key);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data()['value'] : null;
    } catch {
      return null;
    }
  }
}
