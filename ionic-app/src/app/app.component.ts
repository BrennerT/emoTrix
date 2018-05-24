import { TutorialPage } from './../pages/tutorial/tutorial';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { KeyboardScannerPage } from '../pages/keyboard-scanner/keyboard-scanner';
import { GsrPage } from '../pages/gsr/gsr';
import { PulsPage } from './../pages/puls/puls';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Anleitung', component: TutorialPage},
      { title: 'Meine Auswertungen', component: null},
      { title: 'Settings', component: null}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == null){
      alert("This page is not implemented yet");
    }else{
      this.nav.setRoot(page.component);
    }
  }
}
