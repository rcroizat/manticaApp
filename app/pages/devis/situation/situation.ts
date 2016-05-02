import {Page, NavController, Alert, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {BudgetPage} from '../budget/budget';

@Page({
	templateUrl: 'build/pages/devis/situation/situation.html'
})

export class SituationPage {


	situationForm : ControlGroup;
	nav : NavController;
	constructor(form: FormBuilder, nav: NavController, private _params: NavParams) {
		this.nav = nav;

		this.situationForm = form.group({ // name should match [ngFormModel] in your html
			situationActuelle: ["", Validators],
			avancement: ["", Validators]
		});

		this._params = _params;
		// userParams is an object we have in our nav-parameters
		let ba = this._params.get('devis');
		console.log(ba);
	}
			
	next() {
		this.nav.push(BudgetPage);
	}
		
}
