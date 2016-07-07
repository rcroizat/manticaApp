import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ZONES }     from './zonage';
import {ZoneData} from './zones';


export class ZonageService {
ZONES : ZoneData;

	getZones() {
		return this.ZONES;
	}

}
