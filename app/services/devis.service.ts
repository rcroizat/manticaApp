import {Injectable} from 'angular2/core';
import {DevisData} from './devis';

@Injectable()
export class DevisService {
	formData: DevisData = {
		projet: null,
		cpProjet: null,
		villeProjet: null,
		typeProjet: null,
		etat: null,
		norme: null,
		bbc: null,
		usage: null,
		situationActuelle: null,
		avancement: null,

		civilite: null,
		nom: null,
		prenom: null,
		cp: null,
		ville: null,
		preference: null,
		telPort: null,
		telFixe: null,
		mail: null,

		montant: null,
		notaire: null,
		budget: null,
	};

	constructor() {
		
	}

	getDevisData() {
		return this.formData;
	}

}