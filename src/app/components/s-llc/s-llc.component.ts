import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { UserInterface } from 'src/app/models/user-interface';
import { InfoInterface } from 'src/app/models/info-interface';
import { QuoteInterface } from 'src/app/models/quote-interface';
import { UserWService } from 'src/app/services/user-w.service';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { isError } from "util";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-s-llc',
  templateUrl: './s-llc.component.html',
  styleUrls: ['./s-llc.component.css']
})
export class SLlcComponent implements OnInit {
  ngFormOne: FormGroup;
  ngFormTwo: FormGroup;
  ngFormThree: FormGroup;
  public isError = false;
  public isError2 = false;
  public isError3 = false;
  public info: InfoInterface;
  text="¿Qué tipo de empresa eres?";
  steep=0;
  isLogged = false;
  submitted = false;
  submitted2 = false;
  submitted3 = false;
  userType="";
  email="";
  firstSteep = [
    { companyName: '', industry: '', description: '' },
];
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
    description:"",
    companyAddress:"",
    recipientAddress:"",
    associateAddress:"",
    emailAdmin:"",
    associateName:"",
    liableName:"",
    liablePhone:"",
    liableEmail:"",
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
get fval2() {
  return this.ngFormTwo.controls;
  }
get fval3() {
  return this.ngFormThree.controls;
  }
public checkOne(){
  this.submitted = true;
  if (this.ngFormOne.invalid) {
    this._uw.errorFormOne=true;
  return;
      } 
    this.next(0);
  }
  showSuccess() {
    this.toastr.success('Solicitud enviada con éxito!', 'OK' , {
      progressBar:true,
      progressAnimation:'increasing',

      timeOut: 5000
  })
             }
public checkTwo(){
    this.submitted2 = true;
    if (this.ngFormTwo.invalid) {
      this._uw.errorFormTwo=true;
    return;
        } 
      this.next(1);
    }
public checkThree(){
      this.submitted3 = true;
      if (this.ngFormThree.invalid) {
        this._uw.errorFormThree=true;
      return;
          }      
          this.proccess();  
      }
public  back(i:any){
   if(i>0 ){this.steep=i-1}
  }
  public updateCard(){
    this._uw.card.statusLlc="proccess"; 
    this.dataApiService.updateCard(this._uw.card,this._uw.card.id).subscribe();
  }
public proccess (){
  this._uw.quote.serviceDescription="Registro LLC";
  this._uw.quote.amount=this._uw.amount;
  this._uw.quote.flag="svv";
  this._uw.quote.status="proccess";
      
this._uw.quote.serviceDescription="Registro LLC";
this._uw.quote.message="nueva solicitud LLC";
this._uw.quote.subject="nuevo LLC";
this._uw.quote.messageSubject="nuevo LLC";
this._uw.quote.name="tester name";
this._uw.quote.link="https://www.savvylatinos.co/login";
this._uw.quote.emailAdmin=this._uw.emailAdmin;
this._uw.quote.email=this.email;


  this._uw.quote.companyName=this.ngFormOne.value.companyName;
  this._uw.quote.companyAddress=this.ngFormTwo.value.companyAddress;
  this._uw.quote.associateName=this.ngFormTwo.value.associateName;
  this._uw.quote.recipientAddress=this.ngFormTwo.value.recipientAddress;
  this._uw.quote.associateAddress =this.ngFormTwo.value.associateAddress;
  this._uw.quote.liableName=this.ngFormThree.value.liableName;
  this._uw.quote.liablePhone=this.ngFormThree.value.liablePhone;
  this._uw.quote.liableEmail=this.ngFormThree.value.liableEmail;
  this.dataApiService.saveQuote(this._uw.quote) .subscribe(
    quote => 
    {
  
    //this.waiting=false
    //this.successform=true

    this.showSuccess()
    //this.text=""
    this.updateCard();
    this.router.navigate(['/checkout'])
    }// this.router.navigate(['/successregister'])
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
public getInfo(){
  this.dataApiService.getInfo()
  .subscribe((info: InfoInterface) => {
    this.info=info;
    console.log(this.info);
    this._uw.amount=this.info[0].prices[3].price;
       } );

}
public next(i:any){this.steep=i+1;console.log("steep "+this.steep);}
  ngOnInit() {
    this.info=null;
    this.getInfo();
    this.ngFormOne = this.formBuilder.group({
      companyName: ['', [Validators.required]],
       description: ['', [Validators.required]]
      });
    this.ngFormTwo = this.formBuilder.group({
      companyAddress: ['', [Validators.required]],
        recipientAddress: ['', [Validators.required]],
        associateName: ['', [Validators.required]],
        associateAddress: ['', [Validators.required]]
      });
    this.ngFormThree = this.formBuilder.group({
      liableName: ['', [Validators.required]],
        liablePhone: ['', [Validators.required]],
        liableEmail: ['', [Validators.required]]
      });

    this.steep=0;
    this.onCheckUser();
    this.email=this.authService.getCurrentUser().email;
    this.userType=this.authService.getCurrentUser().userType;
    console.log(""+this.userType);
  }

}
