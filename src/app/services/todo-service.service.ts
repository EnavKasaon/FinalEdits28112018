import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {appSettings} from '../app.settings';


import {Task} from '../models/Task' 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable() 
export class TodoService {
  // private _todos: BehaviorSubject<string[]>; 
  private baseUrl: string;
  private dataStore: {  // This is where we will store our data in memory
    todos: string[]
  };
    
  // Using Angular DI we use the HTTP service
  constructor(private _http: HttpClient, private _appSettings: appSettings) {
  }
  
  public insertTask(task:Task): Observable<any>{
    const body = JSON.stringify(task);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post(`${this._appSettings.serverBaseUrl}/api/Task/Insert`, body , headerOptions);
}
  public loadAll(): Observable<Task> {
    return this._http.get<Task>(`${this._appSettings.serverBaseUrl}/api/Task/GetAllTasks`);
  }
  public deleteTask (id:number): Observable<any>{  
    console.log("Task ID: "+id);
     return this._http.delete(`${this._appSettings.serverBaseUrl}/api/Task/Delete/?id=${id}`);
    }
}
