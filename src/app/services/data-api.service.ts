import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TixInterface } from '../models/tix-interface';
import { SaleInterface } from '../models/sale-interface';
import { OrderInterface } from '../models/order-interface';
import { ContactInterface } from '../models/contact-interface';
import { InfoInterface } from '../models/info-interface';
import { UserWService } from "./user-w.service";
import { QuoteInterface } from '../models/quote-interface';
import { CardInterface } from '../models/card-interface';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
	card: Observable<any>;
	cards: Observable<any>;
	info: Observable<any>;
	tixs: Observable<any>;
	tix: Observable<any>;
	sale: Observable<any>;
	order: Observable<any>;
	quote: Observable<any>;
  constructor(
  	public _uw:UserWService,
  	private http: HttpClient, 
  	private authService:AuthService
  	) {}
  	headers : HttpHeaders = new HttpHeaders({
  		"Content-Type":"application/json",
  		Authorization: this.authService.getToken(),
		  "Access-Control-Allow-Headers" : "Content-Type",
		  "Access-Control-Allow-Origin": "*"
  		});
	

  	updateTix(tix :TixInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.buckapi.com:3070/api/tixes/${id}`;
		return this.http
		.put<TixInterface>(url_api, tix)
		.pipe(map(data => data));
	}
	charge(cantidad, tokenId, description,receipt_email){
		// return this.http.post('http://localhost:3000/stripe_checkout',{
		return this.http.post('https://spayment.buckapiservices.com:3030/stripe_checkout',{
			stripeToken: tokenId,
			cantidad: cantidad,
			description: description,
			receipt_email: receipt_email
		}).toPromise();

	}
	updateCard(card :CardInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.buckapi.com:3070/api/card/${id}`;
		return this.http
		.put<CardInterface>(url_api, card)
		.pipe(map(data => data));
	}
	saveQuote(quote :QuoteInterface){
		const url_api='https://db.buckapi.com:3070/api/quotes';
		return this.http
		.post<QuoteInterface>(url_api, quote)
		.pipe(map(data => data));
	}
	getQuoteByUserd(userd: string){
		const url_api = `https://db.buckapi.com:3070/api/quote?filter[where][userd]=${userd}`;
		return this.http.get(url_api);
	}
	getCards(id:string){
		let indice = id;
		const url_api = "https://db.buckapi.com:3070/api/card?filter[where][userd]=p"+indice;
		return this.http.get(url_api);
	}
	getTixById(id:string){
		let indice = id;
		const url_api=`https://db.buckapi.com:3070/api/tixes/${indice}`;
		this.tix = this.http.get(url_api);
	
		return (this.tix);
	}
	getAllTixs(){
		const url_api = 'https://db.buckapi.com:3070/api/tixes?filter[where][status]=activated';
		return this.http.get(url_api);
	}
	getAllTixsReturn(){
		const url_api = 'https://db.buckapi.com:3070/api/tixes?filter[where][status]=activated';
		return (this.tixs = this.http.get(url_api));
	}
	sendMailNewQuoteAA(quote){
		const url_api='https://10x0zlif84.execute-api.us-east-1.amazonaws.com/api/newquotea';
		return this.http
		.post(url_api, quote)
		.pipe(map(data => data));
	}
	sendMailNewQuoteAU(quote){
		const url_api='https://10x0zlif84.execute-api.us-east-1.amazonaws.com/api/newquote';
		return this.http
		.post(url_api, quote)
		.pipe(map(data => data));
	}
	sendMailNewAppointmentAA(order){
		const url_api='https://email.penguinscleaning.ca:3005/newAppointmentAA';
		return this.http
		.post(url_api, order)
		.pipe(map(data => data));
	}
	sendMailNewContactAA(contact){
		const url_api='https://email.penguinscleaning.ca:3005/newContactAA';
		return this.http
		.post(url_api, contact)
		.pipe(map(data => data));
	}

	sendMailNewAppointmentAU(order){
		const url_api='https://email.penguinscleaning.ca:3005/newAppointmentAU';
		return this.http
		.post(url_api, order)
		.pipe(map(data => data));
	}

 	getTamano(){
		const url_api = 'https://db.buckapi.com:3070/api/tixes?filter[where][status]=activated';
		return (this.tixs = this.http.get(url_api));
	}
	getTamanoIni(){
		const url_api = 'https://db.buckapi.com:3070/api/tixes?filter[where][initload]=activated';
		return (this.tixs = this.http.get(url_api));
	}
 	

	getAllTixsInitload(){
		const url_api = 'https://db.buckapi.com:3070/api/tixes?filter[where][initload]=activated';
		return this.http.get(url_api);
	}
	getInfo(){
		const url_api=`https://db.buckapi.com:3070/api/infos/`;
		this.info = this.http.get(url_api);
		return (this.info);
	}
	saveSale(sale :SaleInterface){
		const url_api='https://db.buckapi.com:3070/api/sale';
		return this.http
		.post<SaleInterface>(url_api, sale)
		.pipe(map(data => data));
	}
	saveOrder(order :OrderInterface){
		const url_api='https://db.buckapi.com:3070/api/order';
		return this.http
		.post<OrderInterface>(url_api, order)
		.pipe(map(data => data));
	}
	saveContact(contact :ContactInterface){
		const url_api='https://db.buckapi.com:3070/api/contacts';
		return this.http
		.post<ContactInterface>(url_api, contact)
		.pipe(map(data => data));
	}
	sendMailNewBookAppToAdmin(book){
		const url_api='https://email.penguinscleaning.ca:3005/newBookAppToAdmin';
		return this.http
		.post(url_api, book)
		.pipe(map(data => data));
	}
	updateOrder(order :OrderInterface, id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.buckapi.com:3070/api/order/${id}`;
		return this.http
		.put<OrderInterface>(url_api, order)
		.pipe(map(data => data));
	}
	getOrderByNpedido(npedido: string){
		const url_api = `https://db.buckapi.com:3070/api/order?filter[where][npedido]=${npedido}`;
		this.order = this.http.get(url_api);
		return (this.order);
	}
	saveCard(card :CardInterface){
		const url_api='https://db.buckapi.com:3070/api/card';
		return this.http
		.post<CardInterface>(url_api, card)
		.pipe(map(data => data));
	}

		// let indice = id;
		// const url_api=`https://db.andesproadventures.com:3018/api/book/${indice}`;
		// this.book = this.http.get(url_api);
		// return (this.book);


		// this.info = this.http.get(url_api);
		// return (this.info);
}