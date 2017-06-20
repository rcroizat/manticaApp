import { NavController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DevisService } from '../../../services/devis.service';
import { DevisData } from '../../../services/devis';

import { DataService } from '../../../services/data.service';


import { CoordonneesPage } from '../coordonnees/coordonnees';

import { FraisNotaire, FraisNotaireDMTO } from '../../../data/notaire';

@Component({
  selector: 'budget',
  templateUrl: 'budget.html'
})

export class BudgetPage implements OnInit {


  budgetForm: FormGroup;
  nav: NavController;
  data: DevisData;

  FraisNotaire: any;
  FraisNotaireDMTO: any;

  acquisition: boolean; // determine si le projet est une acquisition ou un rachat, nécessaire pour savoir si on affiche les Frais de notaire ou de caution
  cautionNotaire: number;
  constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService, private _dataService: DataService) {
    this.nav = nav;

    this.FraisNotaire = FraisNotaire;
    this.FraisNotaireDMTO = FraisNotaireDMTO;
    this.budgetForm = form.group({ // name should match [ngFormModel] in your html
      montant: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getDatas();
  }


  getDatas() {
    // on récupère ce qui a été mis dans l'objet this.data (donc ce qui a été déja rempli dans le form) 
    // sinon on prends ce qui a deja été calculé ou rempli autre part dans l'app (par ex calcul des mensualités)
    this.data = this._devisService.getDevisData();

    this.acquisition = this.data.projet == 'Acquisition' ? true : false;
    this._dataService.getDatas().then(storage => {
      this.data.montant = this.data.montant || storage[0];
      this.data.caution = this.data.caution || storage[6];
    }, rejet => {
      this.data.montant = null;
    });
    this.calculKeyUp();
  }


  calculBudget() {
    this.data.caution = this.data.caution ? this.data.caution : null;
    this.cautionNotaire = this.acquisition ? this.data.notaire : this.data.caution;
    this.data.budget = this.data.montant ? +this.data.montant + this.cautionNotaire : null;
  }


  calculKeyUp() {
        
    if (this.acquisition) {
      this.data.notaire = this.calculFDN(); // met à jour les frais de notaire
    } else {
      this.data.caution = this.data.montant * 0.03;
    }
    this.calculBudget() // met à jour le budget total
  }


  calculFDN() {
    var tranche1 = this.FraisNotaire.Tranche["0-6500"];
    var tranche2 = this.FraisNotaire.Tranche["6500-17000"];
    var tranche3 = this.FraisNotaire.Tranche["17000-60000"];
    var tranche4 = this.FraisNotaire.Tranche["60000"];
    var tva_metropolitane_et_corse = parseFloat(this.FraisNotaire.TVA["metropolitane_et_corse"]);
    var emoluments_metropolitane = parseFloat(this.FraisNotaire.Emoluments["metropolitane"]);
    var securite = parseFloat(this.FraisNotaire.securite);
    var securite_min = parseFloat(this.FraisNotaire.securite_min);

    var taux = [
      [6500.0, (tranche1 / 100)],
      [17000.0, (tranche2 / 100)],
      [60000.0, (tranche3 / 100)],
      [Number.POSITIVE_INFINITY, (tranche4 / 100)]
    ];

    var emoluments_notaire = 0;
    var droits_et_taxes = 0;
    var emoluments_formalites = 0;

    // émoluments du notaire (hors TVA)
    emoluments_notaire += Math.min(this.data.montant, taux[0][0]) * taux[0][1];
    emoluments_notaire += Math.max(Math.min(this.data.montant, taux[1][0]) - taux[0][0], 0.0) * taux[1][1];
    emoluments_notaire += Math.max(Math.min(this.data.montant, taux[2][0]) - taux[1][0], 0.0) * taux[2][1];
    emoluments_notaire += Math.max(this.data.montant - taux[2][0], 0.0) * taux[3][1];


    emoluments_notaire *= ((tva_metropolitane_et_corse / 100) + 1);


    // droits
    //DMTO
    if (this.data.etat == 'Neuf') {
      droits_et_taxes += (this.data.montant * (this.FraisNotaireDMTO[this.data.cpProjet.toString().substr(0, 2)]["neuf"] / 100));
    } else {
      droits_et_taxes += (this.data.montant * (this.FraisNotaireDMTO[this.data.cpProjet.toString().substr(0, 2)]["ancien"] / 100));
    }

    //common.droits_et_taxes += (base * (securite / 100));

    var droitettaxes = (this.data.montant * (securite / 100));
    if (droitettaxes < securite_min) {
      droitettaxes = securite_min;
    }
    // contribution de sécurité immobilière
    var droit_et_taxes_sum = droits_et_taxes + droitettaxes;

    emoluments_formalites = emoluments_metropolitane;


    let resultSal = Math.round(emoluments_notaire + droit_et_taxes_sum + emoluments_formalites);

    return resultSal;
  }


  next() {
    this.nav.push(CoordonneesPage);
  }

}
