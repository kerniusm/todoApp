import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @ViewChild('newItem') todoInput:ElementRef;

  todoList: Todo[] = [];
  todo$: Observable<Todo[]>;
  searchText:string;

  constructor(private _tS: TodoService) { }

  ngOnInit() {
    this.loadTodo();
  }

  loadTodo(){
    return this._tS.getAllTodo().subscribe(
      todoList => { this.todoList= todoList}
    );
  }


  submitTodo(event: Event){
    let name = event.target['value'].trim();
    if (!name) { return; }

    if(event['keyCode'] == 13) {
      this.todoInput.nativeElement.value = "";
      let num = this.todoList.length + 1;
      const todo = {
        name: name,
        isMarkedAsDone:false,
        priority:num
      };
      this._tS.addTodo(todo)
        .subscribe(todo => {
          this.todoList.push(todo);
        });
     }
  }

  removeTodo(todo: Todo): void {
    if(confirm('Are you sure you want delete this item?')){
      this.todoList = this.todoList.filter(h => h !== todo);
      this._tS.deleteTodo(todo);
    }
  }

  markAsDone(todo: Todo, event: Event){
    todo.isMarkedAsDone = event.target['checked'];
    this._tS.updateTodo(todo);
  }

  moveTo(todo: Todo, direction:number){
    let currentPosition = this.todoList.indexOf(todo);
    let position = this.todoList.indexOf(todo) - direction;

    if(position <= -1 || position >= this.todoList.length){
      alert('Can\'t switch a priority!');
      return;
    }
    let switcher = this.todoList[currentPosition];
    this.todoList[currentPosition] = this.todoList[position];
    this.todoList[position] = todo;

  }

  search(term: string): void {
   this.searchText = term;
   this.todo$ = this._tS.searchTodo(this.searchText);
  }
}
