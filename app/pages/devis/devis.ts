import {Page, NavController, Alert} from 'ionic-angular';
import { Http, HTTP_PROVIDERS }    from 'angular2/http';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';

@Page({
	templateUrl: 'build/pages/devis/devis.html',
	providers: [HTTP_PROVIDERS]
})

export class DevisPage {



	creds: string;
	response: string;
	constructor(private _http: Http, form: FormBuilder, nav: NavController) {
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
		console.log(this.devisForm);
		/*  // This is called on form submit
		  login(event) {
							console.log(this.loginForm.value) // {username: <usename>, password: <password> }
			event.preventDefault();
						}
						*/
	}


	send() {

		this._http.post('http://www.e-mantica.com/mailer.php', JSON.stringify({ nom: "kakofm", msg: "ceci est un msg" }))
			.subscribe(res => {
				this.response = res.text();
			});

		let alert = Alert.create({
			title: 'Demande envoyée !',
			subTitle: 'Votre demande a bien été envoyé, un de nos experts vous contactera sous peu',
			buttons: ['OK']
		});
		this.nav.present(alert);


	}

}
