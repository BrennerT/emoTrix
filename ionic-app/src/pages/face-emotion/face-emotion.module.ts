import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaceEmotionPage } from './face-emotion';

@NgModule({
  declarations: [
    FaceEmotionPage,
  ],
  imports: [
    IonicPageModule.forChild(FaceEmotionPage),
  ],
})
export class FaceEmotionPageModule {}
