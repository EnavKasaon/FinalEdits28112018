import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { appSettings } from '../app.settings';
import { User } from '../models/User'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry, map } from 'rxjs/operators';


@Injectable()
export class RegisterService {
  headers: HttpHeaders;
  user: User;
  ansFromServer: any;

  constructor(private _http: HttpClient, private _appSettings: appSettings) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public getUserName(): Observable<User> {
    return this._http.get<User>(`${this._appSettings.serverBaseUrl}/api/Register/GetAllUsers`);
  };

  public getUser(id: number): Observable<User> {
    console.log("User ID: " + id);
    return this._http.get<User>(`${this._appSettings.serverBaseUrl}/api/Register/GetUserByID/?id=${id}`);
  };


  public insertUser(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headerOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._http.post(`${this._appSettings.serverBaseUrl}/api/Register/Insert`, body, headerOptions);
  } 

  getAll() {
    return this._http.get<User[]>('/api/users');
  }

  getById(id: number) {
    return this._http.get('/api/users/' + id); 
  }

  update(user: User) {
    return this._http.put('/api/users/' + user.userID, user);
  }

  public deleteUser (id:number): Observable<any>{  
    console.log("User ID: "+id);
     return this._http.delete(`${this._appSettings.serverBaseUrl}/api/Register/Delete/?id=${id}`);
    };

 

  public CheckIfEmailExist(email: string): Observable<any>{
    const body = JSON.stringify(email);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.put(`${this._appSettings.serverBaseUrl}/api/Register/CheckIfEmailExist`, body , headerOptions);
  }

  public getAllUsers(): Observable<User>{  
    return this._http.get<User>(`${this._appSettings.serverBaseUrl}/api/Register/GetAllUsers`);
   };
} 


