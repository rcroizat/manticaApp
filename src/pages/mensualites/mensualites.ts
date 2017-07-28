import { Component } from '@angular/core';
import { Data } from '../../services/data';
import { DataService } from '../../services/data.service';

import { NavController, Platform } from 'ionic-angular';
import { DevisPage } from '../devis/devis';
import { NotairePage } from '../notaire/notaire';

@Component({
	selector: 'mensualites',
	templateUrl: 'mensualites.html'
})



export class MensualitesPage {

	datas: Data;
	montantAssurance: number;
	assuranceMois: number;
	nouveauMontant: number;
	result: any;
	resultSal: number;
	montant2: number;

	taux: any[];
	ios: boolean = false;



	constructor(private nav: NavController, private _dataService: DataService, private platform: Platform) {
		this.platform = platform;

		if (this.platform.is('ios')) {
			// This will only print when on iOS
			this.ios = true;
		}
	}



	ionViewWillEnter() {
		this.getDatas();
	}

	getDatas() {
		// on recupere le taux sur emantica
		this._dataService.getTaux().subscribe(
			taux => this.taux = taux,
			error => this.taux = null);

		this._dataService.getDatas().then(
			(data: Array<any>) => {
				this.datas = {
					montant: data[0] || null,
					mensualites: data[1] || null,
					duree: data[2] || null,
					interets: data[3] || null,
					dossier: data[4] || null,
					assurance: data[5] || null,
					caution: data[6] || null,
					apport: data[7] || null,
					notaire: data[8] || null
				}
				this.calcul();
			}).catch(rejet => {
				console.log('Error ' + rejet)
			});
	}

	calcul() {
		// le + permet de convertir une promise en number
		this.montant2 = (+this.datas.montant) + (+this.datas.notaire) + (+this.datas.dossier) - (+this.datas.apport);

		if (this.datas.montant) {
			this.datas.caution = Math.round(this.montant2 * 0.013);
			this._dataService.save('caution', this.datas.caution);
		}
		this.nouveauMontant = this.montant2 + this.datas.caution;
		
		let assuranceMoisSal = (this.nouveauMontant) * ((this.datas.assurance / 100) / 12);
		let montantAssuranceSal = (this.datas.assurance * this.datas.duree * (this.nouveauMontant / 100));
		this.assuranceMois = this.formatMillier(Math.round(assuranceMoisSal));
		this.montantAssurance = this.formatMillier(Math.round(montantAssuranceSal));

		// calcul
		if (this.datas.interets > 0) {
			this.resultSal = assuranceMoisSal +
				(
					(
						((this.nouveauMontant) * ((this.datas.interets / 100) / 12))
						/ (1 - (Math.pow((1 + ((this.datas.interets / 100) / 12)), -(this.datas.duree * 12))))
					)
				);

		} else {
			this.resultSal = assuranceMoisSal +
				(
					this.nouveauMontant / (this.datas.duree * 12)
				);
		}
		this.result = this.formatMillier(Math.round(this.resultSal));
	}

	formatMillier(nombre) {
		nombre += '';
		let sep = ' ';
		let reg = /(\d+)(\d{3})/;
		while (reg.test(nombre)) {
			nombre = nombre.replace(reg, '$1' + sep + '$2');
		}
		return nombre;
	}
	/*
		convertBack(str : string){
			let newValue : any = str.replace(' ', '');
			newValue = parseFloat(newValue);
			return newValue;
		}*/

	onKey(field: string, value: number) {
		this._dataService.save(field, value);
		this.calcul();
	}

	openDevis() {
		this.nav.setRoot(DevisPage);
	}

	openNotaire() {
		this.nav.push(NotairePage);
	}

	calculTaux(val: number) {
		let interet;
		if (this.taux) {
			this.taux.forEach(function (element) {
				if (val >= element.duree) {
					interet = element.taux;
				}
			});
			this.datas.interets = interet;
			this._dataService.save('interets', interet);
		}
	}
}
