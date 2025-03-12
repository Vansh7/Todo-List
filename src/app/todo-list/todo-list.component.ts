// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-todo-list',
//   standalone: true,
//   imports: [],
//   templateUrl: './todo-list.component.html',
//   styleUrl: './todo-list.component.css'
// })
// export class TodoListComponent {

// }
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  filteredTodos: any[] = [];
  filterTag: string = '';
  filterPriority: string = '';
  filterUser: string = '';
  sortField: string = 'createdAt';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(private todoService: TodoService, public router: Router) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((data: any) => {
      this.todos = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredTodos = this.todos.filter(todo => {
      return (this.filterTag ? todo.tags.includes(this.filterTag) : true) &&
             (this.filterPriority ? todo.priority === this.filterPriority : true) &&
             (this.filterUser ? todo.users.includes(this.filterUser) : true);
    });

    // Sort todos
    this.filteredTodos.sort((a, b) => {
      if (this.sortField === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (this.sortField === 'priority') {
        const priorityOrder: { [key in 'High' | 'Medium' | 'Low']: number } = {
          High: 1,
          Medium: 2,
          Low: 3
        };
        return (
          priorityOrder[a.priority as 'High' | 'Medium' | 'Low'] -
          priorityOrder[b.priority as 'High' | 'Medium' | 'Low']
        );
      }
      return 0;
    });
    

    this.totalPages = Math.ceil(this.filteredTodos.length / this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get paginatedTodos() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTodos.slice(start, start + this.pageSize);
  }

  deleteTodo(id: string): void {
    if (confirm('Are you sure to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.loadTodos();
      });
    }
  }
}

