import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: false
})
export class TasksComponent  implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(private dataService: DataService) { 
    this.tasks$ = this.dataService.getTasks$();
  }

  ngOnInit() {}

}
