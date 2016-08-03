import {Injectable} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Data} from './data';


@Injectable()
export class DataService {
	storage : Storage;
	public all: Data;
	montant : number;
	constructor() {
		this.storage = new Storage(LocalStorage);
	}

	getDatas() {



/*
Promise.all([this.storage.get('montant'), 
			 this.storage.get('mensualites'),
			 this.storage.get('duree'),
			 this.storage.get('interets'),
			 this.storage.get('dossier'),
			 this.storage.get('assurance'),
			 this.storage.get('caution')]).then((values) => {
  console.log(values); // [3, 1337, "toto"]
});*/
/*

this.storage.get('montant').then(montant => {
				 this.montant = montant;
				 this.all.montant = this.montant;
				 console.log('marche ' + this.all.montant);
});
*/
 	
	  return Promise.all([this.storage.get('montant'), 
							 this.storage.get('mensualites'),
							 this.storage.get('duree'),
							 this.storage.get('interets'),
							 this.storage.get('dossier'),
							 this.storage.get('assurance'),
							 this.storage.get('caution'),
							 this.storage.get('apport'),
							 this.storage.get('notaire')
							 ]); // [3, 1337, "toto"];

};
	/*	this.storage.get('montant').then(montant => {

				 this.montant = montant;

 	 this.storage.set('montant', 45);
	  return new Promise(function(resolve, reject) {
	  
				 let aly = {
					montant: 85,
					mensualites: 988,
					duree: 75757,
					interets: 75757,
					dossier: 575757,
					assurance: 757575,
					caution: 75757575
				 };

	      resolve(aly);
	    });
	*/
			
	

	calculMensualite() {
	}

	save(field:string, value:number) {
		this.storage.set(field, value);
	}

}