import { CameraPage } from './camera';
import { Camera } from '@ionic-native/camera';
describe("Camera Page", () => {

    describe("makeTest", () => {

        it("should take a picture", () => {
            const cameraMock = new Camera();
            /*spyOn(cameraMock, "getPicture").and.callFake(() => {
                return {
                    then: (callback) => { return callback("picture")}  
                };
            });*/
            spyOn(cameraMock, "getPicture");
            let target = new CameraPage(cameraMock);
            target.makeTest();
            expect(cameraMock.getPicture).toHaveBeenCalled()
            //expect(target.resultPic).toEqual("picture");

        })

    })

})