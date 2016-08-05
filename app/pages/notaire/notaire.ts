import {Component} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/notaire/notaire.html',
})

export class NotairePage {
  storage : Storage;
	result: number;
	montantNotaire: number;
	departement: string;
	type: string;
  fa: boolean = false;


  constructor() {
     this.storage = new Storage(LocalStorage);
  }

  calcul(event:any){



    if (event) {
      this.montantNotaire = event.target.value;
    }
    
   let taux = [[6500.0, 0.04000],
               [17000.0, 0.01650],
               [60000.0, 0.01100],
               [Number.POSITIVE_INFINITY, 0.00825]];

   let emoluments_notaire = 0;
   let droits_et_taxes = 0;
   let emoluments_formalites=0;

   // émoluments du notaire (hors TVA)
   emoluments_notaire+=Math.min(this.montantNotaire,taux[0][0])*taux[0][1];
   emoluments_notaire+=Math.max(Math.min(this.montantNotaire,taux[1][0])-taux[0][0],0.0)*taux[1][1];
   emoluments_notaire+=Math.max(Math.min(this.montantNotaire,taux[2][0])-taux[1][0],0.0)*taux[2][1];
   emoluments_notaire+=Math.max(this.montantNotaire-taux[2][0],0.0)*taux[3][1];


    if (this.departement == 'reunion'){
             emoluments_notaire *= 1.4;
    } else if (this.departement == 'guadeloupe' || this.departement == 'guyane') {
            emoluments_notaire *= 1.25;
    }

    // TVA sur émoluments (pas de TVA en Guyane)
    if (this.departement == 'france'){
        emoluments_notaire *= 1.2000;
    }
    else if (this.departement != 'guyane'){
        emoluments_notaire *= 1.0850;
    }

    // droits
    droits_et_taxes += (this.type == 'neuf') ? this.montantNotaire * 0.00715 : this.montantNotaire * 0.05790;
    // contribution de sécurité immobilière
    droits_et_taxes += (this.montantNotaire * 0.001);

    // émoluments de formalités et débours
    if (this.departement == 'reunion')
    {
        emoluments_formalites += (1350.0 * 0.836 * 1.4 * 1.085);
    } 
    else if (this.departement == 'guadeloupe' || this.departement == 'martinique')
    {
        emoluments_formalites += (1350.0 * 0.836 * 1.25 * 1.085);
    }  
    else if (this.departement == 'guyane')
    {
        emoluments_formalites += (1350.0 * 0.836 * 1.25);
    }
    else
    {
        emoluments_formalites += 1350.0;
    }

    this.result = Math.round(emoluments_notaire + droits_et_taxes + emoluments_formalites);

    this.storage.set('notaire', this.result);
  }
}
