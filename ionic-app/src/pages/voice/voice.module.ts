import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoicePage } from './voice';

@NgModule({
  declarations: [
    VoicePage,
  ],
  imports: [
    IonicPageModule.forChild(VoicePage),
  ],
})
export class VoicePageModule {}
