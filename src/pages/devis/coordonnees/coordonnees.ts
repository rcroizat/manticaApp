import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { DevisService } from '../../../services/devis.service';
import { DevisData } from '../../../services/devis';


import { MensualitesPage } from '../../mensualites/mensualites';

import { ValuesPTZ } from '../../../data/zonage';

@Component({
	selector: 'coordonnees',
	templateUrl: 'coordonnees.html'
})

export class CoordonneesPage implements OnInit {

	response: any;
	coordonneesForm: FormGroup;
	nav: NavController;
	data: DevisData;
	valuesPTZ: any = ValuesPTZ;


	constructor(private loadingController: LoadingController, form: FormBuilder, private http: Http, nav: NavController, private _devisService: DevisService, public alertCtrl: AlertController) {
		this.nav = nav;

		this.coordonneesForm = form.group({ // name should match [ngFormModel] in your html

			civilite: ["", Validators.required],
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			telPort: ["", Validators.required],
			mail: ["", Validators.required]
		});
	}


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
	}


	fillVille(ev) {
		let val = ev.target.value;

		if (val > 1000) {
			let villes = this.valuesPTZ.filter((field) => {
				return (field.cp == val);
			})
			this.data.ville = villes[0] ? villes[0].ville : null;
		};

	}



	// envoie un post à mailer.php à la racine d'e-mantica PROD
	send() {
		let value = this.data;

		this.http.post('http://www.e-mantica.com/appMobile/devisMailerApp.php', JSON.stringify(value))
			.subscribe(res => {
				this.response = res;
				/*let loading = this.loadingController.create({
					content: 'Please wait...',
					dismissOnPageChange : true
				});
					loading.present();*/

				if (this.response) {
					let alert = this.alertCtrl.create({
						title: 'Demande envoyée !',
						subTitle: 'Votre demande a bien été envoyé, un de nos experts vous contactera sous peu',
						buttons: [
							{
								text: 'OK',
								handler: () => {
									this.nav.setRoot(MensualitesPage);
								}
							}
						]
					});

					alert.present();

				}

			},
			error => {
				console.log('Erreur coordonnees.ts l.102 : ' + error);
				let alert = this.alertCtrl.create({
					title: 'Erreur',
					subTitle: 'Nous sommes désolé, votre mail n\'a pas pu être envoyé, veuillez vérifier votre connexion internet et réessayer plus tard',
					buttons: ['OK']
				});
				alert.present();
			}
			)


	}



}
