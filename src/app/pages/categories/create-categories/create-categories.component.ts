import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss'],
  standalone: false
})
export class CreateCategoriesComponent  implements OnInit {

  name: string = "";
  priority: string = "";

  constructor(private modalCtrl: ModalController, private dataService: DataService) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

  createCategory() {
      if (!this.validateForm()) {
        return;
      }
  
      const newCategory: Category = {
        id: '',
        name: this.name,
        priority: this.priority
      };
      this.dataService.addCategory(newCategory);
      this.confirm();
    }
  
    validateForm(): boolean {
      return this.name.trim() !== '' && this.priority.trim() !== '';
    }

}
