import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss'],
  standalone: false
})
export class CreateCategoriesComponent implements OnInit {

  @Input() category: Category = {
    id: '',
    name: '',
    priority: ''
  };


  constructor(private modalCtrl: ModalController, private dataService: DataService) {
  }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

  createCategory() {
    console.log('createCategory', this.category);
    if (!this.validateForm()) {
      return;
    }

    const newCategory: Category = {
      id: '',
      name: this.category.name,
      priority: this.category.priority
    };
    this.dataService.addCategory(newCategory);
    this.confirm();
  }

  updateCategory() {
    if (!this.validateForm()) {
      return;
    }
    const updatedCategory: Category = {
      id: this.category.id,
      name: this.category.name,
      priority: this.category.priority
    };
    this.dataService.updateCategory(updatedCategory);
    this.confirm();
  }

  validateForm(): boolean {
    return this.category.name.trim() !== '' && this.category.priority.trim() !== '';
  }

}
