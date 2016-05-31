import {Page} from 'ionic-angular';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';
import {OnInit} from '@angular/core';


@Page({
  templateUrl: 'build/pages/capacite/capacite.html',
})
export class CapacitePage implements OnInit {

	datas: Data;
	math = Math;
	parseFloat = parseFloat;
	r: number = 0;
	constructor(private _dataService: DataService) {

	}


	ngOnInit() {
		this.getDatas();

	}

	getDatas() {
		 this._dataService.getDatas().then(da => this.datas = da);

	}



	onKey(field: string, value: number) {

		this._dataService.save(field, value);
		let df = parseFloat(this.datas.frais) || 0;
		let dc = parseFloat(this.datas.caution) || 0;
		this.r = df + dc;
	}

}
