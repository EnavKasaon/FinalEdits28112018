import { Injectable } from '@angular/core';
import { Volunteer } from '../models/Volunteer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appSettings } from '../app.settings';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  volunteer: Volunteer;
  ansFromServer: any; 

  constructor(private _http: HttpClient, private _appSettings: appSettings) {

  }

  //result: [];


  public getAllVolunteers(): Observable<Volunteer>{  
   return this._http.get<Volunteer>(`${this._appSettings.serverBaseUrl}/api/Volunteer/GetAllVolunteers`);

  };
/*
  public getSupplier (id:number): Observable<Supplier>{  
   console.log("Supplier ID: "+id);
    return this._http.get<Supplier>(`${this._appSettings.serverBaseUrl}/api/Supplier/GetSupplierByID/?id=${id}`);
 
   };

   public deleteSupplier (id:number): Observable<any>{  
    console.log("Supplier ID: "+id);
     return this._http.delete(`${this._appSettings.serverBaseUrl}/api/Supplier/Delete/?id=${id}`);
  
    };
    public UpdateSupplier(supplier:Supplier): Observable<any>{
    const body = JSON.stringify(supplier);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
   
    return this._http.put(`${this._appSettings.serverBaseUrl}/api/Supplier/Update`, body , headerOptions);
    
    }
*/
  public insertVolunteer(supplier:Volunteer): Observable<any>{

    const body = JSON.stringify(supplier);
    const headerOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  
    return this._http.post(`${this._appSettings.serverBaseUrl}/api/Volunteer/Insert`, body , headerOptions);
    
  } 
}
