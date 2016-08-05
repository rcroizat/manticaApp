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
	

	save(field:string, value:number) {
		this.storage.set(field, value);
	}

}