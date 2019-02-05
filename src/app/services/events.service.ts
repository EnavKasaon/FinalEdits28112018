import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appSettings } from '../app.settings';
import { Observable } from 'rxjs/Observable';

import {Event} from '../models/Event' 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private _http: HttpClient, private _appSettings: appSettings) {
  }
  
  public insertEvent(event:Event): Observable<any>{
    const body = JSON.stringify(event);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post(`${this._appSettings.serverBaseUrl}/api/Event/Insert`, body , headerOptions);
}
  public loadAll(): Observable<Event> {
    return this._http.get<Event>(`${this._appSettings.serverBaseUrl}/api/Event/GetAllEvents`);
  }
  public deleteEvent (id:number): Observable<any>{  
    console.log("Event ID: "+id);
     return this._http.delete(`${this._appSettings.serverBaseUrl}/api/Event/Delete/?id=${id}`);
  }
  public UpdateEvent(event:Event): Observable<any>{
    const body = JSON.stringify(event);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.put(`${this._appSettings.serverBaseUrl}/api/Event/UpdateEvent`, body , headerOptions);
    }

}
