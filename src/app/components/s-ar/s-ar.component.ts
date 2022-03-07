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
import { XunkCalendarModule } from '../../../xunk-calendar/xunk-calendar.module';

@Component({
  selector: 'app-s-ar',
  templateUrl: './s-ar.component.html',
  styleUrls: ['./s-ar.component.css']
})
export class SArComponent implements OnInit {
  ngFormOne: FormGroup;
  ngFormTwo: FormGroup;
  ngFormThree: FormGroup;
  public isError = false;
  public isError2 = false;
  public isError3 = false;
  
  text="¿Qué tipo de empresa eres?";
  steep=0;
  isLogged = false;
  submitted = false;
  submitted2 = false;
  submitted3 = false;
  userType="";
  email="";

  public info : InfoInterface;
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
    countryAddress:"",
    dateInit:"",
    companyAddress:"",
    recipientAddress:"",
    liableName:"",
    addressRespon:""
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
    public getInfo(){
      this.dataApiService.getInfo()
      .subscribe((info: InfoInterface) => {
        this.info=info;
        console.log(this.info);
        this._uw.amount=this.info[0].prices[4].price;
           } );
    
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
      this._uw.card.services[1].status="proccess"; 
    this.dataApiService.updateCard(this._uw.card,this._uw.card.id).subscribe();
   }
  public proccess (){
    this._uw.quote.serviceDescription="Registro AR";
      this._uw.quote.amount=this._uw.amount;
      this._uw.quote.flag="svv";
      this._uw.quote.status="proccess";
    this._uw.quote.message="nueva solicitud AR";
		this._uw.quote.subject="nuevo AR";
		this._uw.quote.messageSubject="nuevo AR";
		this._uw.quote.name="tester name";
		this._uw.quote.link="https://www.savvylatinos.co/login";
    this._uw.quote.emailAdmin=this._uw.emailAdmin;
    this._uw.quote.email=this.email;
    
    this._uw.quote.companyName=this.ngFormOne.value.companyName;
    this._uw.quote.countryAddress=this.ngFormOne.value.countryAddress;
    this._uw.quote.dateInit=this.selDate;
    this._uw.quote.companyAddress=this.ngFormTwo.value.companyAddress;
    this._uw.quote.recipientAddress=this.ngFormTwo.value.recipientAddress;
    this._uw.quote.liableName=this.ngFormThree.value.liableName;
    this._uw.quote.addressRespon=this.ngFormThree.value.addressRespon;
    this.dataApiService.saveQuote(this._uw.quote) .subscribe(
      quote => 
      {

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
  public next(i:any){this.steep=i+1;console.log("steep "+this.steep);}

  public selDate = { date:1, month:1, year:1 };
  ngOnInit() {
    this.selDate = XunkCalendarModule.getToday();  
     this.info=null;
    this.getInfo();
    this.ngFormOne = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      countryAddress: ['', [Validators.required]]
      });
    this.ngFormTwo = this.formBuilder.group({
      companyAddress: ['', [Validators.required]],
      recipientAddress: ['', [Validators.required]]
      });
    this.ngFormThree = this.formBuilder.group({
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
