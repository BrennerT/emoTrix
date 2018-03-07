import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { KeyboardScannerPage } from '../pages/keyboard-scanner/keyboard-scanner';
import { GsrPage } from '../pages/gsr/gsr';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Decider } from '../providers/decider';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    KeyboardScannerPage,
    GsrPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    KeyboardScannerPage,
    GsrPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Decider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
