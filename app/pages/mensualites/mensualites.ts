import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/mensualites/mensualites.html'
})
export class MensualitesPage {


	montant : number;
	mensualite: number;
	matt = Math;
  constructor() {
	 
  }

  onkey(event: any) {
	  this.montant = event.target.value;
	  this.mensualite = this.montant / (10 * 12);
  }


}
