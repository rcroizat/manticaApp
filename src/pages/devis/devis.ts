import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {SituationPage} from './situation/situation';

import {DevisService} from '../../services/devis.service';
import {DevisData} from '../../services/devis';

import {Component, OnInit} from '@angular/core';


import {ValuesPTZ} from '../../data/zonage';

@Component({
  selector: 'devis',
  templateUrl: 'devis.html'
})

export class DevisPage implements OnInit  {


	devisForm : FormGroup;
	nav : NavController;
 	valuesPTZ:any = ValuesPTZ;
	data: DevisData; // ce formulaire sera un objet utilisé lors de la demande de devis, il est réinjecté à toutes les pages
	constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService) {
		this.nav = nav;
		this.devisForm = form.group({ // name should match [ngFormModel] in your html
			projet: ["", Validators.required],
			cpProjet: ["", [Validators.required, Validators.pattern('(?=^(95|94|93|92|91|78|77|75))([0-9]{5})')]],
			villeProjet: ["", Validators.required],
			typeProjet: ["", Validators.required],
			etat: ["", Validators.required],
			usage: ["", Validators.required]
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

      if (val > 10000) {
        let villes = this.valuesPTZ.filter((field) => {
          return (field.cp == val);
        })
        this.data.villeProjet = villes[0] ? villes[0].ville : null ;
      };

   }


	next(){
	
		this.nav.push(SituationPage);

	}
	

}
