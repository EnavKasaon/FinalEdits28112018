import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/User';
import { RegisterService } from '../services/register.service';
import { FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  // moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginDetails: any = []; 
  public newlog: Login = new Login;
  public newUser: User = new User;
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedUser: Login = new Login;
  private _alertType: string;
  alertMsg: string;
  registerForm: FormGroup; 
  submitted = false;
  form: FormGroup = new FormGroup({});
  alertType: string;
  returnUrl: string;

  constructor(private _loginService: LoginService, 
        private formBuilder: FormBuilder, 
        private router: Router, 
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) { }
  

  ngOnInit() {

    // reset login status
    this.authenticationService.logout();
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.stopLoading = false;
    this.newlog.userID= 0;
    this.newUser.userID= 0;

    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    }); 
    console.log(this.loginDetails.userName);
  }
 
  get f() { return this.registerForm.controls; }
  
  UserNameError: string="";
  userNameVaild: boolean = false;
  NoValueUserName: string="שדה זה הינו שדה חובה";
  passwordError: string="";
  passwordVaild: boolean = false;
  NoValuePassword: string="שדה זה הינו שדה חובה";
  err: boolean = false;

  checkPasswordAndUsername(){
    this.UserNameError = "";
    this.passwordError = "";
    var ans = false;
    if( this.newUser.userName == "" || this.newUser.Password == ""){
      this.UserNameError = this.NoValueUserName;
      this.passwordError = this.NoValuePassword;

      this.userNameVaild = false;
      this.passwordVaild = false;
      this.err = false; 

      console.log(this.UserNameError);
      console.log(this.passwordError);
    }
    else {
      this.userNameVaild = true;
      this.passwordVaild = true;
      this.UserNameError = "";
      this.passwordError = "";
    this._loginService.CheckIfPassAndNameExist(this.newUser ).subscribe((data) =>{
        ans = data.SuccesMsg;
        if(ans){
          this.UserNameError =" ";
          this.userNameVaild = true;
          this.err= true; 
          this.logInto();
          
        }
        else{
          this.UserNameError ="שם משתמש או סיסמה לא נכונים ";
          console.log(this.UserNameError);
          this.userNameVaild = false;
        }   
       });
    }
  }



  logInto(){
    this.submitted = true;
    console.log("Trying to log in...");
    // this.stopLoading = true;
        // this.stopLoading = false;  
          if ( !this.registerForm.invalid && this.err==true) {
      // this.authenticationService.login(this.model.username, this.model.password)
          // .subscribe(
              // data => {
                alert('ברוכים הבאים :-)') 
                this.router.navigate(['/', 'home']).then(nav => {
                  console.log(nav); // true if navigation is successful
                }, err => {
                  console.log(err) // when there's an error
                 });
                          }          // },
              error => { 
                this.alertType = "danger";
                this.alertMsg = "שגיאה בעת הכניסה.";
                this.submitted = false;
                // });
              }
        console.log(this.ansFromServer);
  }

 }


