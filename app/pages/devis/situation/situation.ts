import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {BudgetPage} from '../budget/budget';

@Page({
	templateUrl: 'build/pages/devis/situation/situation.html'
})

export class SituationPage {


	nav : NavController;

	constructor(form: FormBuilder, nav: NavController) {
		this.nav = nav;


	}
		

	next() {
		console.log('next');
		this.nav.push(SituationPage);
	}
}
