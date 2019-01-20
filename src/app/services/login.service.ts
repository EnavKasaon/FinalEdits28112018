import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appSettings } from '../app.settings';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LoginService {
  headers: HttpHeaders;

  logi: Login;
  ansFromServer: any;  

  constructor(private _http: HttpClient, private _appSettings: appSettings) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }
}