import {Component, OnInit, Input} from '@angular/core';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';

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
	constructor(private _dataService: DataService) {
/*
		this.datas;*/
  }


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this._dataService.getDatas().then(data => {
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

		this.datas.caution = (this.montant2 * 0.01);
		this._dataService.save('caution', Math.round(this.datas.caution));

		this.nouveauMontant = this.montant2 + this.datas.caution;
		
		this.assuranceMois = (this.nouveauMontant) * ((this.datas.assurance/100)/12);
		this.montantAssurance = (this.datas.assurance * this.datas.duree * (this.nouveauMontant/100));

		this.resultSal = this.assuranceMois + 
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

	onKey(field:string, value:number) {


		this._dataService.save(field, value); // un cran de retard

		this.calcul();
		
	}



}
