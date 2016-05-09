import {Injectable} from 'angular2/core';
import {DevisData} from './devis';

@Injectable()
export class DevisService {
	constructor() {
		
	}

	getDevisData() {
		return DevisData;

	}

}