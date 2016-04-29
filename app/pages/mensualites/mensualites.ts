import {Page} from 'ionic-angular';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';
import {OnInit} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/mensualites/mensualites.html'
})
export class MensualitesPage implements OnInit {

	datas: Data;
	math = Math;
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
	}



}
