import {Page} from 'ionic-angular';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';
import {OnInit, Output, Input} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/mensualites/mensualites.html'
})
export class MensualitesPage implements OnInit {

	datas: Data;
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

	getDatas() {
		this.datas = this._dataService.getDatas();	
	
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
