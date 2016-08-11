import {Component, OnInit, Input, Injectable} from '@angular/core';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';

import {NavController} from 'ionic-angular';
import {DevisPage} from '../devis/devis';

@Component({
  templateUrl: 'build/pages/mensualites/mensualites.html'
})



export class MensualitesPage implements OnInit {

	@Input() datas: Data;
	montantAssurance: number;
	assuranceMois: number;
	nouveauMontant : number;
	result :any;
	resultSal: number;
	montant2: number;
	ablou: string = 'lakekeke';




	constructor(private nav: NavController, private _dataService: DataService) {

 	}


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this._dataService.getDatas().then((data: Array<any>) => {
			this.datas = {
				montant: data[0] || null,
				mensualites: data[1] || null,
				duree: data[2] || null,
				interets: data[3] || null,
				dossier: data[4] || null,
				assurance: data[5] || null,
				caution: data[6] || null,
				apport: data[7] || null,
				notaire: data[8] || null
			},  rejet => {
				console.log(rejet)
			};
		this.calcul();
		});
	}

	calcul(){
		// le + permet de convertir une promise en number
		this.montant2 = (+this.datas.montant) + (+this.datas.notaire) + (+this.datas.dossier) - (+this.datas.apport);
		if(this.datas.montant != null && this.datas.duree != null){
			this.datas.caution = Math.round(this.montant2 * 0.01);
			this._dataService.save('caution', this.datas.caution);
		}
		this.nouveauMontant = this.montant2 + this.datas.caution;
		
		let assuranceMoisSal = (this.nouveauMontant) * ((this.datas.assurance/100)/12);
		let montantAssuranceSal = (this.datas.assurance * this.datas.duree * (this.nouveauMontant/100));
		this.assuranceMois = Math.round(assuranceMoisSal);
		this.montantAssurance = Math.round(montantAssuranceSal);

		this.resultSal = assuranceMoisSal + 
		(
			(
				( (this.nouveauMontant) * ((this.datas.interets/100)/12))/
				(1-(Math.pow((1+((this.datas.interets/100)/12)),-(this.datas.duree*12))))
 			)
 		);
		this.result = this.formatMillier(Math.round(this.resultSal));

	}

	formatMillier( nombre){
	nombre += '';
	  let sep = ' ';
	  let reg = /(\d+)(\d{3})/;
	  while( reg.test( nombre)) {
	    nombre = nombre.replace( reg, '$1' +sep +'$2');
	  }
	  return nombre;
	}

	convertBack(str : string){
		let newValue = str.replace(' ', '');
		newValue = parseFloat(newValue);
		return newValue;
	}

	onKey(field:string, value:number) {

		this._dataService.save(field, value); // un cran de retard

		this.calcul();

	}

	openDevis() {
		this.nav.setRoot(DevisPage);
	}



}
