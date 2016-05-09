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
	departement: number;
	type: number;
  constructor() {

  }

  calcul(a : any, b : any){
	  this.result = a + b;
  }
}
