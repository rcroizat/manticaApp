import {Injectable} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Data} from './data';

@Injectable()
export class DataService {
	storage : Storage;
	all: Data;
	
	constructor() {
		this.storage = new Storage(LocalStorage);
	}

	getDatas() {

		this.storage.get('montant').then(montantP => {

			console.log(this.all.montant);
			return this.all.montant = montantP;
		});/*
		this.storage.get('duree').then(dureeP => {
			this.all.duree = dureeP;
		});
		let mensualites = this.storage.get('mensualites');
		let duree = this.storage.get('duree');
		let interets = this.storage.get('interets');
		let frais = this.storage.get('frais');
		let assurance = this.storage.get('assurance');
		let caution = this.storage.get('caution');*/

/*		var all = {
			montant: montant,
			mensualites: mensualites,
			duree: duree,
			interets: interets,
			frais: frais,
			assurance: assurance,
			caution: caution
		};*//*
		console.log(this.all);
			return this.all;
			return new Promise<Data[]>(resolve => )*/
		
	}

	calculMensualite() {
	}

	save(field:string, value:number) {
		this.storage.set(field, value);
	}

}