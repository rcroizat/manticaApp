import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
/*
  Generated class for the AgencesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/agences/agences.html',
})
export class AgencesPage {

private _platform: Platform;
private _isAndroid: boolean;
private _isiOS: boolean;

  constructor(private navCtrl: NavController, private platform : Platform) {
  	this._platform = platform;
	this._isAndroid = platform.is('android');
	this._isiOS = platform.is('ios');
}

  	stmichel(){
console.log('kkk');
  }

  	brunoy(){
  	let destination = '48.689087, 2.483391';

			let label = encodeURI('Mantica Brunoy');
			window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
	}

  	massy(){
  	let destination = '48.723598, 2.285580';

			let label = encodeURI('Mantica Massy');
			window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
	}

  	meulan(){
  	let destination = '49.004171, 1.912882';

			let label = encodeURI('Mantica Meulan');
			window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
	}

 }


