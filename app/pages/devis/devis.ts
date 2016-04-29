import {Page, NavController, Alert} from 'ionic-angular';
import { Http, HTTP_PROVIDERS }    from 'angular2/http';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {SituationPage} from './situation/situation';

@Page({
	templateUrl: 'build/pages/devis/devis.html',
	providers: [HTTP_PROVIDERS]
})

export class DevisPage {


	response : boolean;
	devisForm : ControlGroup;
	nav : NavController;

	constructor(private http: Http, form: FormBuilder, nav: NavController) {
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
		console.log('next');
		this.nav.push(SituationPage);
	}

	send() {
		
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
			});

	}

	

}
