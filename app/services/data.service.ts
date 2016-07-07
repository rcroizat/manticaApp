import {Injectable} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Data} from './data';


@Injectable()
export class DataService {
	storage : Storage;
	all: Data;/*
	data: Data;*/
	
	constructor() {
		this.storage = new Storage(LocalStorage);
	}

	getDatas() {

/*		this.storage.get('montant').then(montantP => {

			 this.all.montant = montantP;

			 console.log('lll');

			 console.log(this.all.montant);
		});

		console.log(this.storage.get('mensualites'));
*/


/*		
		this.storage.get('data').then(data => {
			this.data = data;
			return JSON.parse(data);
		});*/
/*

		let montant = this.storage.get('montant');
		let mensualites = this.storage.get('mensualites');
		let duree = this.storage.get('duree');
		let interets = this.storage.get('interets');
		let frais = this.storage.get('frais');
		let assurance = this.storage.get('assurance');
		let caution = this.storage.get('caution');*/

		let montant = 0;
		let mensualites = 0;
		let duree = 0;
		let interets = 0;
		let frais = 0;
		let assurance = 0;
		let caution = 0;

		this.all = {
			montant: montant,
			mensualites: mensualites,
			duree: duree,
			interets: interets,
			frais: frais,
			assurance: assurance,
			caution: caution
		};
			
		return this.all;
	}

	calculMensualite() {
	}

	save(field:string, value:number) {
		this.storage.set(field, value);
	}

}