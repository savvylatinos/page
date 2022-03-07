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
  selector: 'app-s-corp',
  templateUrl: './s-corp.component.html',
  styleUrls: ['./s-corp.component.css']
})
export class SCorpComponent implements OnInit {
  ngFormOne: FormGroup;
  ngFormTwo: FormGroup;
  ngFormThree: FormGroup;
  ngFormFour: FormGroup;
  public isError = false;
  public isError2 = false;
  public isError3 = false;
  public isError4 = false;
  text="¿Qué tipo de empresa eres?";
  steep=0;
  isLogged = false;
  submitted = false;
  submitted2 = false;
  submitted3 = false;
  submitted4 = false;
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
    description:"",
    companyAddress:"",
    recipientAddress:"",
    associateAddress:"",
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
get fval4() {
  return this.ngFormFour.controls;
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
        this.next(2);
    }
  public checkFour(){
    this.submitted4 = true;
    if (this.ngFormFour.invalid) {
      this._uw.errorFormThree=true;
    return;
        }      
        this.proccess();  
    }
  public  back(i:any){
     if(i>0 ){this.steep=i-1}
    }
    public updateCard(){
      this._uw.card.statusCorp="proccess"; 
      this.dataApiService.updateCard(this._uw.card,this._uw.card.id).subscribe();
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
    public proccess (){
      this._uw.quote.serviceDescription="Registro CORP";
      this._uw.quote.amount=this._uw.amount;
      this._uw.quote.flag="svv";
      this._uw.quote.status="proccess";
    this._uw.quote.message="nueva solicitud CORP";
		this._uw.quote.subject="nuevo CORP";
		this._uw.quote.messageSubject="nuevo CORP";
		this._uw.quote.name="tester name";
		this._uw.quote.link="https://www.savvylatinos.co/login";
    this._uw.quote.emailAdmin=this._uw.emailAdmin;
    this._uw.quote.email=this.email;
    

      this._uw.quote.state=this.ngFormOne.value.state;
      this._uw.quote.companyName=this.ngFormOne.value.companyName;
      this._uw.quote.description=this.ngFormOne.value.description;
      this._uw.quote.actionsNumber=this.ngFormOne.value.actionsNumber;
      this._uw.quote.directorName=this.ngFormTwo.value.directorName;
      this._uw.quote.directorAddress=this.ngFormTwo.value.directorAddress;
      this._uw.quote.secretaryName=this.ngFormTwo.value.secretaryName;
      this._uw.quote.secretaryAddress=this.ngFormTwo.value.secretaryAddress;
      this._uw.quote.presidentName=this.ngFormTwo.value.presidentName;
      this._uw.quote.presidentAddress=this.ngFormTwo.value.presidentAddress;
      this._uw.quote.treasurerName=this.ngFormTwo.value.treasurerName;
      this._uw.quote.treasurerAddress=this.ngFormTwo.value.treasurerAddress;
      this._uw.quote.companyAddress=this.ngFormThree.value.companyAddress;
      this._uw.quote.recipientAddress=this.ngFormThree.value.recipientAddress;
      this._uw.quote.liableName=this.ngFormFour.value.liableName;
      this._uw.quote.liableAddress=this.ngFormFour.value.liableAddress;
      this.dataApiService.saveQuote(this._uw.quote) .subscribe(
        quote => 
        {
        // console.log("solicitud corp enviada")
        this.showSuccess()
         this.updateCard();
         this.router.navigate(['/checkout'])
      
      
        //this.waiting=false
        //this.successform=true
        //this.text=""
        }// this.router.navigate(['/successregister'])
    );
    }
    public next(i:any){this.steep=i+1;console.log("steep "+this.steep);}
    public getInfo(){
      this.dataApiService.getInfo()
      .subscribe((info: InfoInterface) => {
        this.info=info;
        console.log(this.info);
        this._uw.amount=this.info[0].prices[2].price;
           } );
    
    }
  ngOnInit() {
    this.info=null;
    this.getInfo();
    this.ngFormOne = this.formBuilder.group({
        state: ['', [Validators.required]],
        companyName: ['', [Validators.required]],
        actionsNumber: [0, [Validators.required]],
        description: ['', [Validators.required]]
      });
    this.ngFormTwo = this.formBuilder.group({
        directorName: ['', [Validators.required]],
        directorAddress: ['', [Validators.required]],
        secretaryName: ['', [Validators.required]],
        secretaryAddress: ['', [Validators.required]],
        presidentName: ['', [Validators.required]],
        presidentAddress: ['', [Validators.required]],
        treasurerName: ['', [Validators.required]],
        treasurerAddress: ['', [Validators.required]]
      });
    this.ngFormThree = this.formBuilder.group({
        companyAddress: ['', [Validators.required]],
        recipientAddress: ['', [Validators.required]]
      });
      this.ngFormFour = this.formBuilder.group({
        liableName: ['', [Validators.required]]
      });
    this.steep=0;
    this.onCheckUser();
    this.email=this.authService.getCurrentUser().email;

    this.userType=this.authService.getCurrentUser().userType;
    console.log(""+this.userType);
  }

}
