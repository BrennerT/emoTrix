import { IndicatorScore, indicator } from './../classes/IndicatorScore';
import { SensorEvaluator } from "../classes/Sensor";
import * as $ from 'jquery';

export class FaceSensor extends SensorEvaluator{

    mapper(data:any): IndicatorScore[]{
        // currently without neutral indicator
        let result = [
            {indicator: <indicator>"angryIndicator", score: <number>data.anger},
            {indicator: <indicator>"contemptIndicator", score: <number>data.contempt},
            {indicator: <indicator>"disgustIndicator", score: <number>data.disgust},
            {indicator: <indicator>"fearIndicator", score: <number>data.fear},
            {indicator: <indicator>"happyIndicator", score: <number>data.happiness},
            {indicator: <indicator>"sadIndicator", score: <number>data.sadness},
            {indicator: <indicator>"surpriseIndicator", score: <number>data.surprise},
            {indicator: <indicator>"neutralIndicator", score: <number>data.neutral}
        ];
        console.log(result);
        return result;
    }

    prepareData(base64Data: String){
        let self = this;
        this.sensorObserver.next("Sending data to Microsoft");
        $.ajax({
            url: 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion',
            type: 'POST',
            processData: false,
            headers: {
              "Ocp-Apim-Subscription-Key": "0013b227bb26420c8f4184379701b02d",
            },
            contentType: 'application/octet-stream',
            data: this.makeblob(base64Data)
          })
          .done(function(data) {
            // Show formatted JSON on webpage.
            if(JSON.stringify(data) == '[]'){
              // Users face can't be recognized
              self.sensorObserver.next("empty result");
            }else{
              let emotions = data[0].faceAttributes.emotion;
              self.sensorObserver.next("result:"+JSON.stringify(emotions));
            }
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            // TODO: this should be send via observer
            let errorString = (errorThrown === "") ?
              "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
              "" : ($.parseJSON(jqXHR.responseText).message) ?
                      $.parseJSON(jqXHR.responseText).message :
                          $.parseJSON(jqXHR.responseText).error.message;
            
            self.sensorObserver.next("error:" + errorString);
          })
    }
   
 /**
   * This function is needed to send local pictures to microsoft api without storing them in cloud.
   * Takes a file path and converts the file found there to an blob. 
   * 
   * Found this function here: 
   * https://social.msdn.microsoft.com/Forums/sqlserver/en-US/807ee18d-45e5-410b-a339-c8dcb3bfa25b/testing-project-oxford-ocr-how-to-use-a-local-file-in-base64-for-example
   * @param dataURL also Base64 encoding possible
   */
  makeblob (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);
    
    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    
    return new Blob([uInt8Array], { type: contentType });
  }
}