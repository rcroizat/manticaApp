import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';
import {Component, OnInit} from '@angular/core';


@Component({
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
		/* this._dataService.getDatas().then(da => this.datas = da);*/
		 this.datas = this._dataService.getDatas();	

	}



	onKey(field: string, value: number) {

		this._dataService.save(field, value);
		let df = this.datas.frais || 0;
		let dc = this.datas.caution || 0;
		this.r = df + dc;
	}

}
