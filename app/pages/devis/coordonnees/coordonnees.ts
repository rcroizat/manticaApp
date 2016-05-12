import {Page, NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Http, HTTP_PROVIDERS }    from 'angular2/http';
import {OnInit} from 'angular2/core';


import {DevisService} from '../../../services/devis.service';
import {DevisData} from '../../../services/devis';


import {GettingStartedPage} from '../../../pages/getting-started/getting-started';


@Page({
	templateUrl: 'build/pages/devis/coordonnees/coordonnees.html',
	providers: [HTTP_PROVIDERS]
})

export class CoordonneesPage implements OnInit {

	response: any;
	coordonneesForm : ControlGroup;
	nav : NavController;
	data: DevisData;
	constructor(form: FormBuilder, private http: Http, nav: NavController, private _devisService: DevisService) {
		this.nav = nav;

		this.coordonneesForm = form.group({ // name should match [ngFormModel] in your html
			civilite: ["", Validators],
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			cp: ["", Validators],
			ville: ["", Validators],
			preference: ["", Validators],
			telPort: ["", Validators.required],
			telFixe: ["", Validators],
			mail: ["", Validators.required]
		});
	}


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
	}
// envoie un post à mailer.php à la racine d'e-mantica PROD
	send() {
		let value = this.data;
		
		this.http.post('http://www.e-mantica.com/mailer.php', JSON.stringify(value))
			.subscribe(res => {
				this.response = res;
				if (this.response) {
					let alert = Alert.create({
						title: 'Demande envoyée !',
						subTitle: 'Votre demande a bien été envoyé, un de nos experts vous contactera sous peu',
						buttons: [
							{
								text: 'OK',
								handler: () => {
									this.nav.setRoot(GettingStartedPage);
								}
							}
						]
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
			});

	}

	
		
}
