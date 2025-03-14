// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-list',
//   standalone: true,
//   imports: [],
//   templateUrl: './user-list.component.html',
//   styleUrl: './user-list.component.css'
// })
// export class UserListComponent {

// }

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: string = '';
  todos: any[] = [];

  constructor(private userService: UserService, private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  selectUser(user: string): void {
    this.selectedUser = user;
    this.todoService.getTodosByUser(user).subscribe(data => {
      this.todos = data;
    });
  }
}

