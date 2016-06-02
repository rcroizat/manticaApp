import {Page} from 'ionic-angular';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';
import {OnInit} from '@angular/core';
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
		let df = parseFloat(this.datas.frais) || 0;
		let dc = parseFloat(this.datas.caution) || 0;
		let da = parseFloat(this.datas.montant) * (parseFloat(this.datas.assurance)/100)/12  || 0;
		this.assuranceMois = da || 0;
		let assuranceTotal = parseFloat(this.datas.assurance) * parseFloat(this.datas.duree) * (parseFloat(this.datas.montant)/100) || 0;
		this.montantAssurance = assuranceTotal;
		this.r = df + dc;
	}



}
