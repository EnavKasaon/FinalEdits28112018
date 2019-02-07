import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RegisterService } from '../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
//import { checkEmail } from '../_helpers/checkEmail.validator';
import { Router } from '@angular/router';
import { FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private _registerService:RegisterService, 
    private formBuilder: FormBuilder,
    private router: Router) { }
  //  private registerService: RegisterService

  ngOnInit() { 
    // this.stopLoading=false;
    this.newUser.userID= 0;
    this.registerForm = this.formBuilder.group({
      
      userName: ['', Validators.required], 
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', Validators.required] },
       {
        validator: MustMatch('Password', 'confirmPassword')
       // validator1: checkEmail('Email')
    });
    console.log(this.registerDetails.Email);
  }


  get f() { return this.registerForm.controls; }
  EmailError: string="";
  emailVaild: boolean = false;
  NoValue: string="שדה זה הינו שדה חובה";


  checkEmail(){
    this.EmailError = "";
    var ans = false;
    if(this.newUser.Email == ""){
      this.EmailError = this.NoValue;
      this.emailVaild = false;
      console.log(this.EmailError);
    }
    else {
      this.emailVaild = true;
      this.EmailError = "";
    this._registerService.CheckIfEmailExist(this.newUser.Email).subscribe((data) =>{
        ans = data.SuccesMsg;
        if(ans){
          this.EmailError ="אימייל זה כבר קיים במערכת";
          console.log(this.EmailError);
          this.emailVaild = false;
        }
        else{
          this.EmailError = "";
          this.emailVaild = true;
        }   
       });
    }
  }

  insertUser(){ 
    this.submitted = true;
    console.log("Trying to insert User...");
    console.log("User: "+JSON.stringify(this.newUser)+" ID: "+this.newUser.userID);
    // this.stopLoading = true;
    if (!this.registerForm.invalid && this.emailVaild==true){
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
  
 // else{
  //  this.alertType = "danger";
  //  this.alertMsg ="בעיה.";
 // } 
}

 
}
