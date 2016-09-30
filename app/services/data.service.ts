import {Injectable} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Data} from './data';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';



import 'rxjs/Rx';


@Injectable()
export class DataService {
	private tauxUrl = 'http://www.e-mantica.com/appMobile/taux.php';
	storage : Storage;
	constructor(private http: Http) {
		this.storage = new Storage(LocalStorage);
	}

	getDatas() {
	  return Promise.all([this.storage.get('montant'), 
							 this.storage.get('mensualites'),
							 this.storage.get('duree'),
							 this.storage.get('interets'),
							 this.storage.get('dossier'),
							 this.storage.get('assurance'),
							 this.storage.get('caution'),
							 this.storage.get('apport'),
							 this.storage.get('notaire'),
							 this.storage.get('capacite')
							 ]); 
	};

	getTaux (): Observable<any[]> {
  	  return this.http.get(this.tauxUrl)
	                  .map(this.extractData)
	                  .catch(this.handleError);
  	}
	
	extractData(res: Response) {
	    let body = res.json();
	    return body;
	}

	private handleError (error: any) {
	    // In a real world app, we might use a remote logging infrastructure
	    // We'd also dig deeper into the error to get a better message
	    let errMsg = (error.message) ? error.message :
	      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	    console.error(errMsg); // log to console instead
	    return Observable.throw(errMsg);
	}


	save(field:string, value:number) {
		this.storage.set(field, value);
	}

}