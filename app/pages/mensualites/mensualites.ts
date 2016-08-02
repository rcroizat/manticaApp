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
	dodo : any;
	math = Math;
	parseFloat = parseFloat;
	r: number =  0;
	montantAssurance: number;
	assuranceMois: number;
	constructor(private _dataService: DataService) {

  }


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {/*
		this.datas = this._dataService.getDatas();	
*/
		this._dataService.getDatas().then(da => {

			this.dodo.flou = 25;
			console.log('ami');
			console.log(this.dodo.flou);
/*
			console.log('chablagou');
				da.forEach(function(elem, i, arr){
					switch(i) {
					    case 1:
					    	this.dodo.montant = elem;
					        break;
					    case 2:
					        this.dodo.mensualites = elem;
					        break;
					    case 3:
					        this.dodo.interets = elem;
					        break;
					}
				});
			console.log(JSON.stringify(this.dodo));*/
			});
	}


	onKey(field:string, value:number) {

		this._dataService.save(field, value);	
		let df = (this.datas.frais) || 0;
		let dc = (this.datas.caution) || 0;
		let da = this.datas.montant * (this.datas.assurance/100)/12  || 0;
		this.assuranceMois = da || 0;
		let assuranceTotal = (this.datas.assurance * this.datas.duree * (this.datas.montant/100)) || 0;
		this.montantAssurance = assuranceTotal;
		this.r = df + dc;
	}



}
