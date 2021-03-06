import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appSettings } from '../app.settings';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User'


@Injectable()
export class LoginService {
  headers: HttpHeaders;
  passandname: string;
  logi: Login;
  ansFromServer: any;  

  constructor(private _http: HttpClient, private _appSettings: appSettings) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  } 

  // [OperationContract]
  // [WebGet(UriTemplate = "IsValidUser/{userid}/{password}")]
  // string IsValidUser(string userid, string password);

 //   this.passandname= username + password;
    //  const body1 = JSON.stringify(password);
    // const both= body+ body1;
   // return this._http.put(`${this._appSettings.serverBaseUrl}/api/LogIn/CheckIfPassAndNameExist`, both, headerOptions);


  // return this._http.put(`${this._appSettings.serverBaseUrl}/api/LogIn/CheckIfPassAndNameExist`,                                    
  //  {body, body1},                                               
  //  { params: { headerOptions} })
  

  // public CheckIfPassAndNameExist(username: string, password: string): Observable<any>{
    // const body = JSON.stringify(username);
    // const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    // return this._http.put(`${this._appSettings.serverBaseUrl}/api/LogIn/CheckIfPassAndNameExist`, body, headerOptions);
  // }


public CheckIfPassAndNameExist(user:User): Observable<any>{
  const body = JSON.stringify(user);
  const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  return this._http.post(`${this._appSettings.serverBaseUrl}/api/LogIn/CheckIfPassAndNameExist`, body , headerOptions);
}
  
  getAll() {
    return this._http.get<User[]>('/api/users');
  }

  getById(id: number) {
    return this._http.get('/api/users/' + id); 
  }

  public getUserName(): Observable<User> {
    return this._http.get<User>(`${this._appSettings.serverBaseUrl}/api/LogIn/GetAllUsers`);
  };

  public getUser(id: number): Observable<User> {
    console.log("User ID: " + id);
    return this._http.get<User>(`${this._appSettings.serverBaseUrl}/api/LogIn/GetUserByID/?id=${id}`);
  };

}