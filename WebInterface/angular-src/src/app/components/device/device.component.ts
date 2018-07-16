import { Component, OnInit, Input } from '@angular/core';
import { InputService } from '../../services/input.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devicesShow: boolean = false;
  Devices: Object = [];

  radioconfigs: Object = [];

  SensorBoardInfo = null;

  hideForInit = false;

  selectedEntry;

  //SensorBoardInfoTest = '{"@context":{"@vocab":"https://ns.bergnet.org/dark-horse/"},"@id":"","@type":["Device","sensorType"],"radio":{"@type":"RMF654","frequency":154,"network":1,"client":1,"password":"1236"}}';

  //sbit = JSON.parse(JSON.stringify(this.SensorBoardInfoTest));

  onSelectionChange(entry) {
    this.selectedEntry = entry;
  }

  startInitialize() {
    this.flashMessage.show(this.selectedEntry.type + " wird an das Board geschickt.", { cssClass: 'alert-success', timeout: 6000 })
    delete this.selectedEntry['_id'];
    delete this.selectedEntry['__v'];
    this.SensorBoardInfo['radio'] = this.selectedEntry;
    this.SensorBoardInfo = this.addAt(this.SensorBoardInfo);
    this.inputService.postRadioConfig(this.SensorBoardInfo).subscribe(data => {
      if (data != '') {
        this.flashMessage.show("Erfolgreich initialisiert.", { cssClass: 'alert-success', timeout: 3000 });
        //this.inputService.closeProxy().subscribe();
      }
    });
    /*this.inputService.saveDevice(this.SensorBoardInfo).subscribe(data => {
      console.log(data);
      if (data.success) {

      } else  console.log("not saved");
    });*/
    this.SensorBoardInfo = null;
    this.showDevice();
  }


  initDiv() {
    var size = Object.keys(this.Devices).length;
    let data = JSON.parse(JSON.stringify(this.Devices));
    for (let i = 0; i < size; i++) {
      if (this.objLength(data[i]) > 1) {
        this.devicesShow = true;
      }
    }
  }

  uuid1() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  deleteAt(sbi) {
    sbi = JSON.stringify(sbi);
    sbi = sbi.replace("@id", "id");
    sbi = sbi.replace("@context", "context");
    sbi = sbi.replace("@type", "type");
    sbi = sbi.replace(/\"@type\"/, "\"type\"");
    sbi = sbi.replace("@vocab", "vocab");
    sbi = JSON.parse(sbi);
    return sbi;
  }

  addAt(sbi) {
    sbi = JSON.stringify(sbi);
    sbi = sbi.replace("id", "@id");
    sbi = sbi.replace("context", "@context");
    sbi = sbi.replace("type", "@type");
    sbi = sbi.replace(/\"type\"/, "\"@type\"");
    sbi = sbi.replace("vocab", "@vocab");
    sbi = JSON.parse(sbi);
    return sbi;
  }

  objLength(obj) {
    var i = 0;
    for (var x in obj) {
      if (obj.hasOwnProperty(x)) {
        i++;
      }
    }
    return i;

  }

  getDeviceInfo(device) {
    this.ng4LoadingSpinnerService.show();
    this.inputService.startProxy(device).subscribe();
    this.inputService.getDeviceInfo().subscribe(data => {
      if (Object.keys(data).length != 0) {
        var tmp = JSON.stringify(data);
        tmp = tmp.replace("@id", "id");
        tmp = tmp.replace("@context", "context");
        tmp = tmp.replace(/\"@type\"/, "\"type\"");
        tmp = tmp.replace("@vocab", "vocab");
        tmp = tmp.replace("@type", "type");
        tmp = JSON.parse(tmp);
        let emptyString: string = "";
        if (tmp.id == emptyString || tmp.id == null) {
          tmp.id = this.uuid1();
          tmp = JSON.stringify(tmp);
          tmp = tmp.replace("id", "@id");
          tmp = JSON.parse(tmp);
          this.flashMessage.show("UUID wird angelegt, bitte warten...",{ cssClass: 'alert-warning', timeout: 5000 });
          this.inputService.putUUID(tmp).subscribe(data => {
            console.log(data);
            if (data.ok) {
              this.flashMessage.show("UUID erfolgreich angelegt.", { cssClass: 'alert-success', timeout: 6000 });
            } else {
              this.flashMessage.show("Es ist ein Fehler aufgetreten", { cssClass: 'alert-danger', timeout: 6000 });
            }
          })
          tmp = JSON.stringify(tmp);
          tmp = tmp.replace("@id", "id");
          tmp = JSON.parse(tmp);
        }
        if (Object.keys(tmp).length != 0) {
          this.SensorBoardInfo = tmp;
          this.hideForInit = false;
        }
      } else {
        this.flashMessage.show("Keine Informationen gefunden", { cssClass: 'alert-danger', timeout: 6000 });

      }
      this.ng4LoadingSpinnerService.hide();
    });
  }



  showDevice() {
    this.inputService.showDevice().subscribe(data => {
      if (data != '') {
        this.Devices = JSON.parse(data);
      }
    });
    this.initDiv();
    this.SensorBoardInfo = null;
    this.hideForInit = true;
  }

  constructor(private inputService: InputService, private flashMessage: FlashMessagesService, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService, private router: Router) { }

  ngOnInit() {
    this.initDiv();
    this.showDevice();
    this.inputService.getRadioConfig().subscribe(radioconfig => {
      this.radioconfigs = radioconfig
    });
  }

}
