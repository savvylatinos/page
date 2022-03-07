import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { ScrollTopService }  from '../../services/scroll-top.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user-interface'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngFormLogin: FormGroup;
  submitted = false;
  constructor(     
    public scrollTopService:ScrollTopService,
    public _uw:UserWService,
    private formBuilder: FormBuilder, 
    private dataApi: DataApiService,
    private authService: AuthService, 
    public router: Router,
    ) { }
    loadAPI = null;  

    url = "assets/assetssavvy/js/latinos.js";
    message = "";  
    public user : UserInterface ={
      email:"",
      password:"",
      userType:""
    };
    public isError = false;
    public isLogged =false;
    public loadScript() {
      let node = document.createElement("script");
      node.src = this.url;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
    get fval() {
      return this.ngFormLogin.controls;
      }
        onIsError(): void {
           
        this.isError = true;
        setTimeout(() => {
        this.isError = true;
          //this.isError = false;
        }, 4000);
      }
         onCheckUser(): void {
        if (this.authService.getCurrentUser() === null) {
             this.isLogged = false;
          this._uw.isLogged=false;
        } else {
          this.isLogged = true;
          this._uw.isLogged = true;
          this.router.navigate(['']);
        }
      }
         onLogin(){
          if (this._uw.loaded==true){
            this.loadAPI = new Promise(resolve => {
              this.loadScript();
           
              });
            }
          this._uw.loaded=true;;
          if (this.ngFormLogin.invalid) {
          return;
            } 
    //      alert('form fields are validated successfully!');
          return this.authService.loginUser(
            this.user.email, 
            this.user.password
            )
          .subscribe( 
            data => {
              //console.log(data);
    
                  this.authService.setUser(data.user);
                  const token = data.id;
                  this.authService.setToken(token);
                  this._uw.userd=data.id;
                  
                  this._uw.name=data.name;
                  this._uw.userW=data.user;
                  this._uw.isLogged=true;
                  this.router.navigate(['/account']);
                  this.isError = false;
               
            },
             error => {
                    if(error.status==401){
                    this.isError = true;
                    this.message="Usuario o contraseña inválidos";
                  }//
             this.onIsError();
             }
    
            ); 
      }   
  ngOnInit() {
    this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
      });

  }

}
