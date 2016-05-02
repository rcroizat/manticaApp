import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {SituationPage} from './situation/situation';

@Page({
	templateUrl: 'build/pages/devis/devis.html'
})

export class DevisPage {


	response : boolean;
	devisForm : ControlGroup;
	nav : NavController;

	constructor(form: FormBuilder, nav: NavController) {
		this.nav = nav;

		this.devisForm = form.group({ // name should match [ngFormModel] in your html
			nom: ["", Validators.required],
			prenom: ["", Validators],
			telDom: ["", Validators],
			telMobil: ["", Validators],
			type: ["", Validators],
			montant: ["", Validators],
			apport: ["", Validators]
		});
		/*  // This is called on form submit
		  login(event) {
							console.log(this.loginForm.value) // {username: <usename>, password: <password> }
			event.preventDefault();
						}
						*/
	}

	next(){
		console.log('edkdfj');
		this.nav.push(SituationPage);
	}
	

}
