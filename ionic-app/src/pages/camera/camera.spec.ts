import { CameraPage } from './camera';
import { Camera } from '@ionic-native/camera';

describe("Camera Page", () => {

    describe("makeTest", () => {

        it("should take a picture", () => {
            const cameraMock = new Camera();
            spyOn(cameraMock, "getPicture").and.callThrough();
            let target = new CameraPage(cameraMock);
            target.makeTest();
            expect(cameraMock.getPicture).toHaveBeenCalled()
        })

        it("should take the picture and set uri as latestPicture", () => {
            const cameraMock = new Camera();
            spyOn(cameraMock, "getPicture").and.returnValue="halloWelt.uri";
            let target = new CameraPage(cameraMock);
            target.makeTest();
            expect(target.latestPicture).toEqual("halloWelt.uri");
        })
    })

})