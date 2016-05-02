import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {CoordonneesPage} from '../coordonnees/coordonnees';

@Page({
	templateUrl: 'build/pages/devis/budget/budget.html'
})

export class BudgetPage {


	budgetForm : ControlGroup;
	nav : NavController;

		constructor(form: FormBuilder, nav: NavController) {
		this.nav = nav;

		this.budgetForm = form.group({ // name should match [ngFormModel] in your html
			montant: ["", Validators.required],
			notaire: ["", Validators],
			budget: ["", Validators]
		});
	}

	next(){
		this.nav.push(CoordonneesPage);
	}
		
}
