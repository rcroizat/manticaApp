import {Injectable} from 'angular2/core';
import {DevisData} from './devis';

@Injectable()
export class DevisService {
	koko: DevisData;
	constructor() {
		
	}

	getDevisData() {
		return this.koko;
		
	}

}