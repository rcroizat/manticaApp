import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {SituationPage} from './situation/situation';
import {DevisService} from '../../services/devis.service';
import {DevisData} from '../../services/devis';
import {OnInit} from 'angular2/core';

import {Input} from 'angular2/core';

@Page({
	templateUrl: 'build/pages/devis/devis.html'
})

export class DevisPage implements OnInit  {


	response: boolean;
	devisForm : ControlGroup;
	nav : NavController;
	data: DevisData;

	constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService) {
		this.nav = nav;
		
	}


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
	}


	next(){
	
		this.nav.push(SituationPage);

	}
	

}
