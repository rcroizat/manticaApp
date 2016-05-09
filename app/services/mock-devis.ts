import {DevisData} from './devis';

export var HEROES: Hero[] = [
	{ "id": 11, "name": "Mr. Nice" },
	{ "id": 12, "name": "Narco" },
	{ "id": 13, "name": "Bombasto" },
	{ "id": 14, "name": "Celeritas" },
	{ "id": 15, "name": "Magneta" },
	{ "id": 16, "name": "RubberMan" },
	{ "id": 17, "name": "Dynama" },
	{ "id": 18, "name": "Dr IQ" },
	{ "id": 19, "name": "Magma" },
	{ "id": 20, "name": "Tornado" }
];

export class DevisData {
	projet: string;
	cpProjet: number;
	villeProjet: string;
	type: string;
	etat: string;
	norme: string;
	bbc: string;
	usage: string;
	situationActuelle: string;
	avancement: string;
	civilite: string;
	nom: string;
	prenom: string;
	cp: number;
	ville: string;
	preference: string;
	telPort: number;
	telFixe: number;
	telPro: number;
	montant: number;
	notaire: number;
	budget: number;
}