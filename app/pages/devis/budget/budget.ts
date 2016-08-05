import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Component, OnInit, Input} from '@angular/core';

import {DevisService} from '../../../services/devis.service';
import {DevisData} from '../../../services/devis';

import {Data} from '../../../services/data';
import {DataService} from '../../../services/data.service';

import {CoordonneesPage} from '../coordonnees/coordonnees';


@Component({
	templateUrl: 'build/pages/devis/budget/budget.html'
})

export class BudgetPage implements OnInit{


	budgetForm : ControlGroup;
	nav : NavController;
	@Input() data: DevisData;
	localData: Data;

	constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService, private _dataService: DataService) {
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
		this._dataService.getDatas().then(data => {
			console.log('data dans bduegt' + JSON.stringify(data));
			this.data.montant = data[0];
			this.data.notaire = data[8];
			},  rejet => {
				console.log(rejet)
			});
	}
	
	next(){
		this.nav.push(CoordonneesPage);
	}
		
}
