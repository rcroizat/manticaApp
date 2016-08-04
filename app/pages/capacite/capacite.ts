import {Component, OnInit, Input} from '@angular/core';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';


@Component({
  templateUrl: 'build/pages/capacite/capacite.html',
})
export class CapacitePage implements OnInit {

	@Input() datas: Data;
	result: any;
	resultSal: number;
	constructor(private _dataService: DataService) {

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
		this.resultSal = 
		 	(
			 	(
					this.datas.mensualites *
						(1- Math.pow((1+((this.datas.interets/100)/12)),-this.datas.duree*12))/
						((this.datas.interets/100)/12)
				) - (this.datas.dossier + this.datas.dossier)
			);
		this.result = this.formatMillier(Math.round(this.resultSal));
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
