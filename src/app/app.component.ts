import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  public appPages = [
    { title: 'Tareas', url: '/tasks', icon: 'checkmark-circle', color: 'primary' },
    { title: 'Categorias', url: '/categories', icon: 'bookmarks', color: 'warning' },
  ];
  
  constructor() {}
}
