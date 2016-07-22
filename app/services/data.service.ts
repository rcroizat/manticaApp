import {Injectable} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Data} from './data';


@Injectable()
export class DataService {
	storage : Storage;
	all: Data;
	all.montant : number;
	mama : string;
	constructor() {
		this.storage = new Storage(LocalStorage);
	}

	getDatas() {

  this.storage.set('montant', 45);

		this.storage.get('montant').then(montantP => {

			 console.log(montantP);
			 this.all.montant = montantP;

			 console.log(this.all.montant);
		});



		this.storage.get('mensualites').then(mensualites => {

			 this.all.mensualites = mensualites;

		});

		
		this.storage.get('duree').then(duree => {

			 this.all.duree = duree;
		});

		
		this.storage.get('interets').then(interets => {

			 this.all.interets = interets;
		});

		
		this.storage.get('frais').then(frais => {

			 this.all.frais = frais;
		});

		
		this.storage.get('assurance').then(assurance => {

			 this.all.assurance = assurance;
		});


		
		this.storage.get('caution').then(caution => {

			 this.all.caution = caution;
		});



	/*	this.storage.get('montant').then(data => {
			this.all.montant = montant;
			console.log('this montant ' + this.montant);
		});
		this.storage.get('duree').then(data => {
			this.all.duree = duree;
		});*/
/*

		let montant = this.storage.get('montant');
		let mensualites = this.storage.get('mensualites');
		let duree = this.storage.get('duree');
		let interets = this.storage.get('interets');
		let frais = this.storage.get('frais');
		let assurance = this.storage.get('assurance');
		let caution = this.storage.get('caution');*/
/*
		let mensualites = 0;
		let interets = 0;
		let frais = 0;
		let assurance = 0;
		let caution = 0;*/

/*		this.all = {
			mensualites: mensualites,
			interets: interets,
			frais: frais,
			assurance: assurance,
			caution: caution
		};*/
		return this.all;

		
	}

	calculMensualite() {
	}

	save(field:string, value:number) {
		this.storage.set(field, value);
	}

}