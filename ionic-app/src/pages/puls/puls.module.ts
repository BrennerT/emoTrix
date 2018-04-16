import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PulsPage } from './puls';

@NgModule({
  declarations: [
    PulsPage,
  ],
  imports: [
    IonicPageModule.forChild(PulsPage),
  ],
})
export class PulsPageModule {}
