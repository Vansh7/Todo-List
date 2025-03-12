// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-todo-detail',
//   standalone: true,
//   imports: [],
//   templateUrl: './todo-detail.component.html',
//   styleUrl: './todo-detail.component.css'
// })
// export class TodoDetailComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo: any = {};
  note: string = '';
  showModal: boolean = false;

  constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.todoService.getTodoById(id).subscribe(data => {
      this.todo = data;
    });
  }

  openNoteModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  addNote(): void {
    if (this.note.trim()) {
      this.todoService.addNote(this.todo._id, this.note).subscribe(updatedTodo => {
        this.todo = updatedTodo;
        this.note = '';
        this.closeModal();
      });
    }
  }
}

