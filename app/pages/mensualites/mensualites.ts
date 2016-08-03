import {Component} from '@angular/core';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';
import {OnInit, Output, Input} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/mensualites/mensualites.html'
})
export class MensualitesPage implements OnInit {

	@Input() datas: Data;
	math = Math;
	montantAssurance: number;
	assuranceMois: number;
	nouveauMontant : number;
	result :any;
	resultSal: number;
	montant2: any;
	constructor(private _dataService: DataService) {

		this.datas;
  }


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this._dataService.getDatas().then(data => {
			this.datas = {
				montant: data[0],
				mensualites: data[1],
				duree: data[2],
				interets: data[3],
				dossier: data[4],
				assurance: data[5],
				caution: data[6],
				apport: data[7],
				notaire: data[8]
			},  rejet => {
				console.log(rejet)
			};
		this.calcul();
		});
	}

	calcul(){


		for (let property in this.datas) {
		/*	property = 66666666;
		    */
		}


		this.montant2 = (this.datas.montant) + (this.datas.notaire) + (this.datas.dossier) - (this.datas.apport);
		console.log(this.montant2);
		this.datas.caution = parseFloat(this.montant2) * 0.01;
		this.nouveauMontant = this.montant2 - this.datas.caution;
		
		this.assuranceMois = (this.nouveauMontant) * (this.datas.assurance/100)/12  || 0;
		this.montantAssurance = (this.datas.assurance * this.datas.duree * (this.nouveauMontant/100)) || 0;

		this.resultSal = this.assuranceMois + 
		(
				(
					( (this.nouveauMontant) * ((this.datas.interets/100)/12))/
					(1-(Math.pow((1+((this.datas.interets/100)/12)),-(this.datas.duree*12))))
 				)
 		);

		this.result = this.formatMillier(this.resultSal.toFixed(2));
	}

	formatMillier( nombre :string){
		nombre += '';
	  let sep = ' ';
	  let reg = /(\d+)(\d{3})/;
	  while( reg.test( nombre)) {
	    nombre = nombre.replace( reg, '$1' +sep +'$2');
	  }
	  return nombre;
	}

	onKey(field:string, value:number) {


		this._dataService.save(field, value);

		this.montant2 = (this.datas.montant) + (this.datas.notaire) + (this.datas.dossier) - (this.datas.apport);

		this.datas.caution = parseFloat(this.montant2) * 0.01;

		this.nouveauMontant = this.montant2 - this.datas.caution;
		
		this.assuranceMois = (this.nouveauMontant) * (this.datas.assurance/100)/12  || 0;
		this.montantAssurance = (this.datas.assurance * this.datas.duree * (this.nouveauMontant/100)) || 0;

		this.resultSal = this.assuranceMois + 
		(
				(
					( (this.nouveauMontant) * ((this.datas.interets/100)/12))/
					(1-(Math.pow((1+((this.datas.interets/100)/12)),-(this.datas.duree*12))))
 				)
 		);
		this.result = this.formatMillier(this.resultSal.toFixed(2));
		
	}



}
