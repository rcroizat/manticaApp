import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {BudgetPage} from '../budget/budget';

@Page({
	templateUrl: 'build/pages/devis/situation/situation.html'
})

export class SituationPage {


	situationForm : ControlGroup;
	nav : NavController;
		constructor(form: FormBuilder, nav: NavController) {
		this.nav = nav;

		this.situationForm = form.group({ // name should match [ngFormModel] in your html
			situationActuelle: ["", Validators.required],
			avancement: ["", Validators]
		});
	}

	next(){
		this.nav.push(BudgetPage);
	}
		
}
