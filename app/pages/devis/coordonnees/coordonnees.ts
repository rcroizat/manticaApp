import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import { Http, HTTP_PROVIDERS }    from 'angular2/http';

@Page({
	templateUrl: 'build/pages/devis/coordonnees/coordonnees.html',
	providers: [HTTP_PROVIDERS]
})

export class CoordonneesPage {

	response: any;
	coordonneesForm : ControlGroup;
	nav : NavController;

	constructor(private http: Http, form: FormBuilder, nav: NavController) {
		this.nav = nav;

		this.coordonneesForm = form.group({ // name should match [ngFormModel] in your html
			civilite: ["", Validators.required],
			nom: ["", Validators],
			prenom: ["", Validators],
			cp: ["", Validators],
			ville: ["", Validators],
			preference: ["", Validators],
			telPort: ["", Validators],
			telFixe: ["", Validators],
			telPro: ["", Validators]
		});
	}


	send() {
		/*
		this.http.post('http://www.e-mantica.com/mailer.php', JSON.stringify(this.devisForm.value))
			.subscribe(res => {
				this.response = res;
				if (this.response) {
					let alert = Alert.create({
						title: 'Demande envoyée !',
						subTitle: 'Votre demande a bien été envoyé, un de nos experts vous contactera sous peu',
						buttons: ['OK']
					});

					this.nav.present(alert);
				} else {
					let alert = Alert.create({
						title: 'Erreur',
						subTitle: 'Nous sommes désolé, votre mail n\'a pas pu être envoyé, veuilleZ réessayer plus tard',
						buttons: ['OK']
					});
					this.nav.present(alert);
				}
			});*/

	}

	
		
}
