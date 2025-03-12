// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TodoService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos`);
  }

  getTodoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos/${id}`);
  }

  createTodo(todo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/todos`, todo);
  }

  updateTodo(id: string, todo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/todos/${id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todos/${id}`);
  }

  addNote(id: string, note: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/todos/${id}/notes`, { note });
  }

  getTodosByUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos/user/${username}`);
  }
}

