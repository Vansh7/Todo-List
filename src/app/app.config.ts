import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', loadComponent: () => import('./todo-list/todo-list.component').then(m => m.TodoListComponent) },
  { path: 'todos/new', loadComponent: () => import('./todo-form/todo-form.component').then(m => m.TodoFormComponent) },
  { path: 'todos/edit/:id', loadComponent: () => import('./todo-form/todo-form.component').then(m => m.TodoFormComponent) },
  { path: 'todos/:id', loadComponent: () => import('./todo-detail/todo-detail.component').then(m => m.TodoDetailComponent) },
  { path: 'users', loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent) }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient() // Add this line to provide HttpClient
  ]
};
