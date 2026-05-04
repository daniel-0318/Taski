import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './core/services/data.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  appPages = [
    { title: 'Tareas', url: '/tasks', icon: 'checkmark-circle', color: 'primary' },
    { title: 'Categorias', url: '/categories', icon: 'bookmarks', color: 'warning' },
  ];

  titlePage = '';

  constructor(
    private router: Router,
    private dataService: DataService,
    private platform: Platform
  ) {
    this.initializeApp()
  }

  async initializeApp() {
    await this.platform.ready();
    await this.dataService.defaultCategories();
    this.setupRouteListener();
  }

  private setupRouteListener() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      const currentPage = this.appPages.find(page => page.url === currentRoute);
      this.titlePage = currentPage ? currentPage.title : '';
    });
  }
}
