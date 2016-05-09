import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {SituationPage} from './situation/situation';
import {DevisService} from '../../services/devis.service';
import {DevisData} from '../../services/devis';
import {OnInit} from 'angular2/core';

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

		this.devisForm = form.group({ // name should match [ngFormModel] in your html
			projet: ["", Validators],
			cpProjet: ["", Validators.required],
			villeProjet: ["", Validators],
			type: ["", Validators],
			etat: ["", Validators],
			norme: ["", Validators],
			bbc: ["", Validators],
			usage: ["", Validators]
		});
	}


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
		console.log(this.data);
	}


	next(){
		this.nav.push(SituationPage, { devis: this.devisForm.value });

	}
	

}
