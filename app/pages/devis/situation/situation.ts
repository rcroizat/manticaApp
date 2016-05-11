import {Page, NavController, Alert, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {BudgetPage} from '../budget/budget';
import {DevisService} from '../../../services/devis.service';
import {DevisData} from '../../../services/devis';
import {OnInit} from 'angular2/core';

@Page({
	templateUrl: 'build/pages/devis/situation/situation.html'
})

export class SituationPage implements OnInit {


	situationForm: ControlGroup;
	nav: NavController;
	data: DevisData;

	constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService) {
		this.nav = nav;

		this.situationForm = form.group({ // name should match [ngFormModel] in your html
			situationActuelle: ["", Validators.required],
			avancement: ["", Validators.required]
		});
		
	}

	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
	}


	next() {
		this.nav.push(BudgetPage);
	}
		
}
