// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-todo-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './todo-form.component.html',
//   styleUrl: './todo-form.component.css'
// })
// export class TodoFormComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todo: any = {
    title: '',
    description: '',
    tags: [],
    priority: 'Medium',
    users: [],
    createdAt: new Date()
  };
  isEdit: boolean = false;
  todoId: string = '';

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.paramMap.get('id') || '';
    if (this.todoId) {
      this.isEdit = true;
      this.todoService.getTodoById(this.todoId).subscribe(data => {
        this.todo = data;
      });
    }
  }

  onSubmit(): void {
    // Convert comma separated strings to arrays if necessary
    if (typeof this.todo.tags === 'string') {
      this.todo.tags = this.todo.tags.split(',').map((t: string) => t.trim());
    }
    if (typeof this.todo.users === 'string') {
      this.todo.users = this.todo.users.split(',').map((u: string) => u.trim());
    }

    if (this.isEdit) {
      this.todoService.updateTodo(this.todoId, this.todo).subscribe(() => {
        this.router.navigate(['/todos']);
      });
    } else {
      this.todoService.createTodo(this.todo).subscribe(() => {
        this.router.navigate(['/todos']);
      });
    }
  }
}
