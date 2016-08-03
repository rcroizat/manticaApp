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
			};
		});
	}



	onKey(field: string, value: number) {

		this._dataService.save(field, value);
		let df = this.datas.dossier || 0;
		let dc = this.datas.caution || 0;
		this.r = df + dc;
	}

}
