import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {appSettings} from '../app.settings';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry, map } from 'rxjs/operators'; 
import { OrderType } from '../models/OrderType';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _http: HttpClient, private _appSettings: appSettings) { }

  
  public insertOrderType(orderType:OrderType): Observable<any>{
    const body = JSON.stringify(orderType);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post(`${this._appSettings.serverBaseUrl}/api/Orders/Insert`, body , headerOptions);
    } 
}
