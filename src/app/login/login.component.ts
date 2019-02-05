import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  // moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  supplierDetails: any = [];
  public newlog: Login = new Login;
  ansFromServer: any;
  arr: any = [];
  public stopLoading = false;
  selectedSup: Login = new Login;
  private _alertType: string;
  alertMsg: string;
  registerForm: FormGroup; 
  submitted = false;
  form: FormGroup = new FormGroup({});
  alertType: string;
  // model: any = {};
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

   // this.newSupp.ID = 0;
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    }); 
  }
 
  get f() { return this.registerForm.controls; }

  logInto(){
    this.submitted = true;
    console.log("Trying to log in...");
    // this.stopLoading = true;
        // this.stopLoading = false;  
          if ( !this.registerForm.invalid) {
      // this.authenticationService.login(this.model.username, this.model.password)
          // .subscribe(
              // data => {
                alert('ברוכים הבאים :-)') 
                this.router.navigate(['/', 'home']).then(nav => {
                  console.log(nav); // true if navigation is successful
                }, err => {
                  console.log(err) // when there's an error
                 });
                            // },
              error => {
                this.alertType = "danger";
                this.alertMsg = "שגיאה בעת הכניסה.";
                this.submitted = false;
                // });
              }
        console.log(this.ansFromServer);
  }
}
 }


