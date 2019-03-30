import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {appSettings} from '../app.settings';


import {Family} from '../models/Family'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry, map } from 'rxjs/operators';


@Injectable()
export class FamilyService {
  headers: HttpHeaders;

  fam: Family;
  ansFromServer: any;  

  constructor(private _http: HttpClient, private _appSettings: appSettings) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public getFamilyName(): Observable<Family>{  
   return this._http.get<Family>(`${this._appSettings.serverBaseUrl}/api/Family/GetAllFamilies`);

  };

  public getFamily (id:number): Observable<Family>{  
   console.log("Family ID: "+id);
    return this._http.get<Family>(`${this._appSettings.serverBaseUrl}/api/Family/GetFamilyByID/?id=${id}`);
 
   };

   public deleteFamily (id:number): Observable<any>{  
    console.log("Family ID: "+id);
     return this._http.delete(`${this._appSettings.serverBaseUrl}/api/Family/Delete/?id=${id}`);
   
    };
    public UpdateFamily(family:Family): Observable<any>{
    const body = JSON.stringify(family);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.put(`${this._appSettings.serverBaseUrl}/api/Family/Update`, body , headerOptions);
    
    }

    // View Family
    public ViewFamily(family:Family): Observable<any>{
      const body = JSON.stringify(family);
      const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
      return this._http.put(`${this._appSettings.serverBaseUrl}/api/Family/View`, body , headerOptions);
      
      }
  public insertFamily(family:Family): Observable<any>{
    const body = JSON.stringify(family);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post(`${this._appSettings.serverBaseUrl}/api/Family/Insert`, body , headerOptions);

}

// Check if the address is unique
public CheckUniqueAddress(family:Family): Observable<any>{
  const body = JSON.stringify(family);
  const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  return this._http.post(`${this._appSettings.serverBaseUrl}/api/Family/CheckUniqueAddress`, body , headerOptions);
}  

}

