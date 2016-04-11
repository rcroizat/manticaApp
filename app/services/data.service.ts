import {DATAS} from './datas';
import {Injectable} from 'angular2/core';

@Injectable()
export class DataService {
	getDatas() {
		return Promise.resolve(DATAS);
	}

}
