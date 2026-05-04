import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      const currentPage = this.appPages.find(page => page.url === currentRoute);
      this.titlePage = currentPage ? currentPage.title : '';
    });

  }
}
