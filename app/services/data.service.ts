import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Data} from './data';

@Injectable()
export class DataService {
	storage : Storage;
	data: any;
	all: Data;
	constructor() {
		this.storage = new Storage(LocalStorage);
	}

	getDatas() {

		let montant = this.storage.get('montant')._result;
		let mensualites = this.storage.get('mensualites')._result;
		let duree = this.storage.get('duree')._result;
		let interets = this.storage.get('interets')._result;
		let frais = this.storage.get('frais')._result;
		let assurance = this.storage.get('assurance')._result;
		let caution = this.storage.get('caution')._result;

		var all = {
			montant: montant,
			mensualites: mensualites,
			duree: duree,
			interets: interets,
			frais: frais,
			assurance: assurance,
			caution: caution
		};

			return all;
		
	}

	calculMensualite() {
	}

	save(field:string, value:number) {
		this.storage.set(field, value);
	}

}