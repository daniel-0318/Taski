import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { DataService } from 'src/app/core/services/data.service';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { PRIORITY_COLORS } from 'src/app/core/constants/categories.constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: false
})
export class CategoriesComponent implements OnInit {

  filteredcategories$: Observable<Category[]>;
  private searchTerm$ = new BehaviorSubject<string>('');
  private limit$ = new BehaviorSubject<number>(10);

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

  priorityColors = PRIORITY_COLORS

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {
    this.filteredcategories$ = combineLatest([
      this.dataService.getCategories$(),
      this.searchTerm$,
      this.limit$
    ]).pipe(
      map(([categories, searchTerm, limit]) => {
        const filtered = categories.filter(c =>
          c.name.toLowerCase().includes(searchTerm)
        );
        return filtered.slice(0, limit);
      })
    );
  }

  ngOnInit() { }


  onIonInfinite(event: any) {
    setTimeout(() => {
      this.nextPage();
      event.target.complete();
    }, 500);
  }

  async openAddCategory() {
    const modal = await this.modalCtrl.create({
      component: CreateCategoriesComponent
    });
    modal.present();

  }

  async editCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: CreateCategoriesComponent,
      componentProps: { category }
    });
    modal.present();

  }

  async showAlert(id: string) {
    const alert = await this.alertController.create({
      header: '¿Eliminar categoría?',
      message: '¿Estás seguro de que deseas eliminar esta categoría?',
      buttons: this.alertButtons,
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      this.deleteCategory(id);
    }

  }

  deleteCategory(categoryId: string) {
    this.dataService.deleteCategory(categoryId);
  }

  searchCategories(event: any) {
    const searchTerm = event.target.value.toLowerCase() || '';
    this.searchTerm$.next(searchTerm);
  }

  nextPage() {
    const currentLimit = this.limit$.value;
    this.limit$.next(currentLimit + 10);
  }

}
