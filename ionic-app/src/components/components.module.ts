import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import{ IonicModule } from 'ionic-angular';

import { CameraComponent } from './camera/camera';

@NgModule({
	declarations: [
		CameraComponent
	],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [CameraComponent]
})
export class ComponentsModule {}
