import {Page} from 'ionic-angular';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';
import {OnInit} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/mensualites/mensualites.html',
  providers: [DataService]
})
export class MensualitesPage implements OnInit {


	montant : number;
	datas: Data;
	math = Math;
	constructor(private _dataService: DataService) {

  }


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this._dataService.getDatas().then(datas => this.datas = datas);
		console.log('lala : ' + this.datas);
	}



}
