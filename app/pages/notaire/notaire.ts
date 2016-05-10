import {Page} from 'ionic-angular';

/*
  Generated class for the NotairePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/notaire/notaire.html',
})

export class NotairePage {
	result: number;
	montantNotaire: number;
	departement: string;
	type: number;
  constructor() {

  }

  calcul(){

     let taux = [[6500.0, 0.04000],
               [17000.0, 0.01650],
               [60000.0, 0.01100],
               [Number.POSITIVE_INFINITY, 0.00825]];

   let emoluments_notaire = 0;
   let droits_et_taxes = 0;
   let emoluments_formalites=0;

         // émoluments du notaire (hors TVA)
         emoluments_notaire+=Math.min(base,taux[0][0])*taux[0][1];
        emoluments_notaire+=Math.max(Math.min(base,taux[1][0])-taux[0][0],0.0)*taux[1][1];
         emoluments_notaire+=Math.max(Math.min(base,taux[2][0])-taux[1][0],0.0)*taux[2][1];
         emoluments_notaire+=Math.max(base-taux[2][0],0.0)*taux[3][1];


   if (this.departement == 'reunion'){
            common.emoluments_notaire *= 1.4;
}else if (localisation == common.LOCALISATION.GUADELOUPE || localisation == common.LOCALISATION.MARTINIQUE || localisation == common.LOCALISATION.GUYANNE){
           common.emoluments_notaire *= 1.25;
}
        // TVA sur émoluments (pas de TVA en Guyane)
        if (localisation == common.LOCALISATION.METROPOLE){
            common.emoluments_notaire *= 1.2000;
        }else if (localisation != common.LOCALISATION.GUYANNE){
            common.emoluments_notaire *= 1.0850;}

        // droits
        common.droits_et_taxes += (typeop == common.TYPEOP.NEUF) ? base * 0.00715 : base * 0.05790;
        // contribution de sécurité immobilière
        common.droits_et_taxes += (base * 0.001);

        // émoluments de formalités et débours
        if (localisation == common.LOCALISATION.REUNION)
            common.emoluments_formalites += (1350.0 * 0.836 * 1.4 * 1.085);
        else if (localisation == common.LOCALISATION.GUADELOUPE || localisation == common.LOCALISATION.MARTINIQUE)
            common.emoluments_formalites += (1350.0 * 0.836 * 1.25 * 1.085);
        else if (localisation == common.LOCALISATION.GUYANNE)
            common.emoluments_formalites += (1350.0 * 0.836 * 1.25);
        else
            common.emoluments_formalites += 1350.0;

        return common.emoluments_notaire + common.droits_et_taxes + common.emoluments_formalites;
  }
}
