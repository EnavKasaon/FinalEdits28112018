import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo-service.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

 
  todoArray: any =[];
  show: boolean = false;
  constructor(private _todoService:TodoService) { 
    
  }
  trackByFn(index, item) {
    return index; // or item.id
  }
 loadData(){
  this._todoService.loadAll().subscribe((data: {}) => {
     this.todoArray = data;
   });
 }
  ngOnInit() {
    this.show = false;
    this.loadData();
  }
  
  addTodo(todo){
    var task = new Task();
    task.task_id=0;
    task.task_desc=todo;
    var ans: any;
    this._todoService.insertTask(task)
    .subscribe((res)=>{
      ans = res;
      console.log(ans);
    });
    this.loadData();
    
  }
  /*delete item*/
  deleteItem(todo){
    var ans: any;
    this._todoService.deleteTask(todo.task_id)
    .subscribe((res)=>{
      ans= res;
      console.log(ans);
    });
    this.loadData();
   }

}
