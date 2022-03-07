import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { UserInterface } from 'src/app/models/user-interface';
import { QuoteInterface } from 'src/app/models/quote-interface';
import { InfoInterface } from 'src/app/models/info-interface';

import { UserWService } from 'src/app/services/user-w.service';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { isError } from "util";
import { ToastrService } from 'ngx-toastr';
import { XunkCalendarModule } from '../../../xunk-calendar/xunk-calendar.module';

@Component({
  selector: 'app-s-ein',
  templateUrl: './s-ein.component.html',
  styleUrls: ['./s-ein.component.css']
})
export class SEinComponent implements OnInit {
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
    name:"",
    surName:"",
    addressRespon:"",
    dateBirthday:"",
    liablePhone:"",
    descriptionActivity:"",
    descriptionProduct:"",
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
        this._uw.card.services[0].status="proccess"; 
        this.dataApiService.updateCard(this._uw.card,this._uw.card.id).subscribe();
           }

    public proccess (){
      this._uw.quote.serviceDescription="Registro EIN";
      this._uw.quote.amount=this._uw.amount;
      this._uw.quote.flag="svv";
      this._uw.quote.status="proccess";
    this._uw.quote.message="nueva solicitud EIN";
		this._uw.quote.subject="nuevo EIN";
		this._uw.quote.messageSubject="nuevo EIN";
		this._uw.quote.name="tester name";
		this._uw.quote.link="https://www.savvylatinos.co/login";
    this._uw.quote.emailAdmin=this._uw.emailAdmin;
    this._uw.quote.email=this.email;
    
      this._uw.quote.companyName=this.ngFormOne.value.companyName;
      // this._uw.quote.memberCompany=this.ngFormOne.value.memberCompany;
      this._uw.quote.name=this.ngFormTwo.value.name;
      this._uw.quote.surName=this.ngFormTwo.value.surName;
      this._uw.quote.addressRespon=this.ngFormTwo.value.addressRespon;
      this._uw.quote.dateBirthday=this.selDate;
      this._uw.quote.liablePhone=this.ngFormTwo.value.liablePhone;
      // this._uw.quote.residentUsa=this.ngFormThree.value.residentUsa;
      // this._uw.quote.bussinesUsa=this.ngFormThree.value.bussinesUsa;
      this._uw.quote.descriptionActivity=this.ngFormThree.value.descriptionActivity;
      this._uw.quote.descriptionProduct=this.ngFormThree.value.descriptionProduct;
      this.dataApiService.saveQuote(this._uw.quote) .subscribe(
        quote => 
        {
      
        this.showSuccess()
        this.updateCard();
        this.router.navigate(['/checkout'])
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
    public getInfo(){
      this.dataApiService.getInfo()
      .subscribe((info: InfoInterface) => {
        this.info=info;
        console.log(this.info);
        this._uw.amount=this.info[0].prices[3].price;
           } );
    
    }
    public next(i:any){this.steep=i+1;console.log("steep "+this.steep);}
    public selDate = { date:1, month:1, year:1 };
    ngOnInit() {
      this.selDate = XunkCalendarModule.getToday(); 
    this.info=null;
    this.getInfo();
    this.ngFormOne = this.formBuilder.group({
      companyName: ['', [Validators.required]]
      });
    this.ngFormTwo = this.formBuilder.group({
      name: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      addressRespon: ['', [Validators.required]],
      liablePhone: ['', [Validators.required]]
      });
    this.ngFormThree = this.formBuilder.group({  
        descriptionActivity: ['', [Validators.required]],
        descriptionProduct: ['', [Validators.required]]
      });

      this.steep=0;
      this.onCheckUser();
      this.email=this.authService.getCurrentUser().email;
      this.userType=this.authService.getCurrentUser().userType;
      console.log(""+this.userType);
  }

}
