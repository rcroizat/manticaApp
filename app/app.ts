import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

// Pages
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {MensualitesPage} from './pages/mensualites/mensualites';
import {NotairePage} from './pages/notaire/notaire';
import {DevisPage} from './pages/devis/devis';
import {CapacitePage} from './pages/capacite/capacite';
import {PtzPage} from './pages/ptz/ptz';


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  rootPage: any = GettingStartedPage;
  pages: Array<{title: string, component: any}>

  constructor(private app: IonicApp, private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'List', component: ListPage },
      { title: 'Mensualités', component: MensualitesPage },
      { title: 'Emprunt', component: CapacitePage },
      { title: 'Demande de devis', component: DevisPage },
      { title: 'Frais de notaire', component: NotairePage },
      { title: 'Prêt à taux zéro', component: PtzPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
