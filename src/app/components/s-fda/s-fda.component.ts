import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { UserInterface } from 'src/app/models/user-interface';
import { QuoteInterface } from 'src/app/models/quote-interface';
import { UserWService } from 'src/app/services/user-w.service';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { isError } from "util";
import { ToastrService } from 'ngx-toastr';
import { InfoInterface } from 'src/app/models/info-interface';

@Component({
  selector: 'app-s-fda',
  templateUrl: './s-fda.component.html',
  styleUrls: ['./s-fda.component.css']
})
export class SFdaComponent implements OnInit {

  ngFormOne: FormGroup;
  public isError = false;
  
  text="¿Qué tipo de empresa eres?";
  steep=0;
  isLogged = false;
  submitted = false;
  userType=""
  email=""
  public info: InfoInterface;
  public user : UserInterface ={
    email:"",
    userType:"",
    password:"",
    status:"",
  };
  public quote : QuoteInterface ={
    type:"",
    status:"",
    companyName:"",
    liableName:"",
    addressRespon:"",
  };
  constructor(
    public router:Router,
    public toastr: ToastrService,
    public authService:AuthService,
    public _uw:UserWService,
    public dataApiService:DataApiService,
    private formBuilder: FormBuilder 
  ) { }
  get fval() {
    return this.ngFormOne.controls;
    }
  
  public checkOne(){
    this.submitted = true;
    if (this.ngFormOne.invalid) {
      this._uw.errorFormOne=true;
    return;
        } 
        this.proccess();
    }

    showSuccess() {
      this.toastr.success('Solicitud enviada con éxito!', 'OK' , {
        progressBar:true,
        progressAnimation:'increasing',
        timeOut: 5000
    })
               }
 
    public updateCard(){
      this._uw.card.services[4].status="proccess"; 
      this.dataApiService.updateCard(this._uw.card,this._uw.card.id).subscribe();
     }
  public proccess (){
    this._uw.quote.serviceDescription="Registro FDA";
    this._uw.quote.amount=this._uw.amount;
    this._uw.quote.flag="svv";
    this._uw.quote.status="proccess";
    this._uw.quote.message="nueva solicitud FDA";
    this._uw.quote.subject="nuevo FDA";
    this._uw.quote.messageSubject="nuevo FDA";
    this._uw.quote.name="tester name";
    this._uw.quote.link="https://www.savvylatinos.co/login";
    this._uw.quote.emailAdmin=this._uw.emailAdmin;
    this._uw.quote.email=this.email;
  

    this._uw.quote.companyName =this.ngFormOne.value.companyName;
    this._uw.quote.liableName =this.ngFormOne.value.liableName;
    this._uw.quote.addressRespon =this.ngFormOne.value.addressRespon;
    this.dataApiService.saveQuote(this._uw.quote) .subscribe(
      quote => 
      {
      this.showSuccess()
      this.updateCard();
      this.router.navigate(['/account'])
   
      }
  );
  }
  onCheckUser(): void {
    if (this.authService.getCurrentUser() === null) {
      this.isLogged = false;
      this._uw.isLogged=false;
    } else {
      this.isLogged = true;
      this._uw.isLogged=true;
    }
  }
  public next(i:any){this.steep=i+1;console.log("steep "+this.steep);}
  public getInfo(){
    this.dataApiService.getInfo()
    .subscribe((info: InfoInterface) => {
      this.info=info;
      console.log(this.info);
         } );
  
  }
  ngOnInit() {
    this.info=null;
    this.getInfo();
    this.ngFormOne = this.formBuilder.group({
      companyName: ['', [Validators.required]],
       liableName: ['', [Validators.required]],
       addressRespon: ['', [Validators.required]]
      });
    
    this.steep=0;
    this.onCheckUser();
     this.email=this.authService.getCurrentUser().email;
    this.userType=this.authService.getCurrentUser().userType;
    console.log(""+this.userType);
  }

}
