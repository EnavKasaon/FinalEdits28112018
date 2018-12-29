import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Injectable() 
export class TodoService {
  private _todos: BehaviorSubject<string[]>; 
  private baseUrl: string;
  private dataStore: {  // This is where we will store our data in memory
    todos: string[]
  };
    
  // Using Angular DI we use the HTTP service
  constructor(private http: HttpClient) {
    this.baseUrl  = "http://localhost:4200";
    this.dataStore = { todos: [] };
    this._todos = <BehaviorSubject<string[]>>new BehaviorSubject([]);
  }
  
  get todos() {
    return this._todos.asObservable();
  }
    
  loadAll() {
    this.http.get(`${this.baseUrl}/todos`).subscribe(data => {
      this.dataStore.todos = String.arguments(data);
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not load todos.'));
  }
  saveAll( updated :string[]){
    this.http.post(`${this.baseUrl}/todos`, JSON.stringify(updated)).subscribe(data => {
      this.dataStore.todos = updated;
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not create todo.'));
  }
}
