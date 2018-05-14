import { FaceEmotionPage } from './../pages/face-emotion/face-emotion';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ComponentsModule } from './../components/components.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { KeyboardScannerPage } from '../pages/keyboard-scanner/keyboard-scanner';
import { GsrPage } from '../pages/gsr/gsr';
import { PulsPage } from '../pages/puls/puls';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { Decider } from '../providers/decider';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { GSRSensor } from '../providers/sensors/GSRSensor';
import { DecisionPage } from '../pages/decision/decision';

import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    KeyboardScannerPage,
    GsrPage,
    PulsPage,
    DecisionPage,
    FaceEmotionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    KeyboardScannerPage,
    GsrPage,
    PulsPage, 
    DecisionPage,
    FaceEmotionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Decider,
    Camera,
    MediaCapture,
    GSRSensor,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
