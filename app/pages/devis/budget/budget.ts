import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';
import {OnInit, Input} from '@angular/core';



import {DevisService} from '../../../services/devis.service';
import {DevisData} from '../../../services/devis';


import {CoordonneesPage} from '../coordonnees/coordonnees';


@Page({
	templateUrl: 'build/pages/devis/budget/budget.html'
})

export class BudgetPage implements OnInit{


	budgetForm : ControlGroup;
	nav : NavController;
	@Input() data: DevisData;

	constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService) {
		this.nav = nav;

		this.budgetForm = form.group({ // name should match [ngFormModel] in your html
			montant: ["", Validators.required]
		});
	}

	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
	}
	
	next(){
		this.nav.push(CoordonneesPage);
	}
		
}
