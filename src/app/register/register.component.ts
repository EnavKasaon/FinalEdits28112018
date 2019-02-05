import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RegisterService } from '../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { Router } from '@angular/router';

@Component({
  // moduleId: module.id,
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
  supplierDetails: any = [];
  private _alertType: string;
  registerForm: FormGroup; 
  submitted = false;
  form: FormGroup = new FormGroup({});
  // model: any = {};

  constructor(private _registerService:RegisterService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService) { }

  ngOnInit() { 
    // this.stopLoading=false;
    this.newUser.userID= 0;
    
    this.registerForm = this.formBuilder.group({
      
      userName: ['', Validators.required], 
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('Password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  insertUser(){ 
    this.submitted = true;
    console.log("Trying to insert User...");
    console.log("User: "+JSON.stringify(this.newUser)+" ID: "+this.newUser.userID);
    // this.stopLoading = true;
    if (!this.registerForm.invalid){
    this.newUser = <User> this.registerForm.value;
    this._registerService.insertUser(this.newUser)
    .subscribe((res) => {
      this.ansFromServer = res.SuccesMsg;
      // this.stopLoading = false;
      if(this.ansFromServer != -1 && !this.registerForm.invalid){
        this.alertType = "success";
        this.alertMsg ="המשתמש הוזן בהצלחה!";
        alert('המשתמש הוזן בהצלחה!') 

        this.router.navigate(['/login']); 
      } 
      else{
        this.alertType = "danger";
        this.alertMsg ="הוספת המשתמש נכשלה.";
      }
        console.log(this.ansFromServer);
 });
  }
  
  else{
    this.alertType = "danger";
    this.alertMsg ="עדכון הספק נכשל.";} 
} 
}
