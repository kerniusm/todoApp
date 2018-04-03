import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {Todo} from './todo';

import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TodoService {

  private todoUrl = 'api/todo';

  constructor(private _http: HttpClient) { }


  getAllTodo (): Observable<Todo[]> {
    return this._http.get<Todo[]>(this.todoUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this._http.post<Todo>(this.todoUrl, todo, httpOptions);
  }

  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todoUrl}/${id}`;
    return this._http.delete<Todo>(url, httpOptions);
  }

  updateTodo(todo: Todo): Observable<any> {
   return this._http.put(this.todoUrl, todo, httpOptions);
  }

  searchTodo(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const url = `${this.todoUrl}/?name=${term}`;
    return this._http.get<Todo[]>(url);
  }

}
