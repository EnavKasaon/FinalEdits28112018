import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerDetails:any =  [];
  public newUser: User = new User;
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedUser : User = new User;
  alertType: string;
  alertMsg: string;

  constructor(private _registerService:RegisterService) { }

  ngOnInit() { 
    this.stopLoading=false;
    this.newUser.userID= 0;

  }

  insertUser(){
    console.log("Trying to insert User...");
    console.log("User: "+JSON.stringify(this.newUser)+" ID: "+this.newUser.userID);
    this.stopLoading = true;
    this._registerService.insertUser(this.newUser)
    .subscribe((res) => {
      this.ansFromServer = res;
      this.stopLoading = false;
      if(this.ansFromServer != -1){
        this.alertType = "success";
        this.alertMsg ="המשתמש הוזן בהצלחה!"; 
      } 
      else{
        this.alertType = "danger";
        this.alertMsg ="הוספת המשתמש נכשלה.";
      }
        console.log(this.ansFromServer);
 });
  }
}
