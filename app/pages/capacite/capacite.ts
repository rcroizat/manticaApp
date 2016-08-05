import {Component, OnInit, Input} from '@angular/core';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';


@Component({
  templateUrl: 'build/pages/capacite/capacite.html',
})
export class CapacitePage implements OnInit {

	@Input() datas: Data;
	montantAssurance: number;
	result: any;
	resultSal: number;
	cout: number;
	constructor(private _dataService: DataService) {

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

		this.resultSal = 
		 	(
			 	(
					this.datas.mensualites *
						(1- Math.pow((1+((this.datas.interets/100)/12)),-this.datas.duree*12))/
						((this.datas.interets/100)/12)
				) - (this.datas.dossier + this.datas.dossier)
			);
		this.montantAssurance = (this.datas.assurance * this.datas.duree * (this.resultSal/100));

		this.cout =  (this.datas.dossier) + (this.datas.caution) + (this.montantAssurance);
			console.log(this.cout );
		this.montantAssurance = (this.datas.assurance * this.datas.duree * (this.resultSal/100));

		this.result = this.formatMillier(Math.round(this.resultSal));

		if(Math.round(this.resultSal) > 0){ // sauvegarde de la capacite d'emprunt qui est égal au budget du client
			this._dataService.save('capacite', Math.round(this.resultSal));

		}
	}



	formatMillier( nombre ){
		nombre += '';
		let sep = ' ';
		let reg = /(\d+)(\d{3})/;
		while( reg.test( nombre)) {
			nombre = nombre.replace( reg, '$1' +sep +'$2');
		}
		return nombre;
	}


	onKey(field: string, value: number) {


		this._dataService.save(field, value);

		this.calcul();
	}

}
