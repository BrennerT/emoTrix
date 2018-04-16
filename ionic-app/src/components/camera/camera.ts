import { Component } from '@angular/core';

/**
 * Generated class for the CameraComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'camera',
  templateUrl: 'camera.html'
})
export class CameraComponent {

  text: string;

  constructor() {
    console.log('Hello CameraComponent Component');
    this.text = 'Hello World';
  }

}
