import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@Component ({
    selector: 'keyboard-scanner',
    templateUrl: 'keyboard-scanner.html',
    providers: [Keyboard]
})
export class KeyboardScannerPage {

    constructor(public navCtrl: NavController, public keyboard: Keyboard){
        this.keyboard.show()
    }
    
}