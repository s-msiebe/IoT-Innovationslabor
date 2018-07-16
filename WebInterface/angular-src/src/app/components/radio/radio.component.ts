import { Component, OnInit , Directive} from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { InputService } from '../../services/input.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],

})
export class RadioComponent implements OnInit {

  type: string;
  frequency: number;
  network: number;
  client: number;
  password: string;

  idRC: string;

  radioconfigs: Object = [];

  showSaveButton = false;

  sendRadioConfig() {
    this.showSaveButton = false;
    const rc = {
      type: this.type,
      frequency: this.frequency,
      network: this.network,
      client: this.client,
      password: this.password
    }
    //console.log(rc);

    if (!this.validateService.validateRadioConfig(rc)) {
      this.flashService.show('Bitte alle Felder ausfüllen.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    } else {
      this.inputService.inputRadioConfig(rc).subscribe(data => {
        console.log(data)
        if (data.success) {
          this.flashService.show('Erfolgreich angelegt.', { cssClass: 'alert-success', timeout: 3000 });
          this.type = ''
          this.frequency = null
          this.network = null
          this.client = null
          this.password = ''

          this.inputService.getRadioConfig().subscribe(radioconfig => {
            this.radioconfigs = radioconfig
          });

        } else {
          this.flashService.show('Etwas lief falsch.', { cssClass: 'alert-danger', timeout: 3000 });
        }
      })
    }
  }

  showRadioAlert(radioconf) {
    this.flashService.show(radioconf)
  }

  saveChanges(){
    const rc = {
      type: this.type,
      frequency: this.frequency,
      network: this.network,
      client: this.client,
      password: this.password,
      id: this.idRC
    }
    this.inputService.updateRadioConfig(rc).subscribe();
    this.flashService.show('Änderung gespeichert.', { cssClass: 'alert-success', timeout: 3000 });
    this.inputService.getRadioConfig().subscribe(radioconfig => {
      console.log(radioconfig)
      this.radioconfigs = radioconfig
    });

  }

  editRadioConfig(radioconfig) {
    this.showSaveButton = true;
    this.type = radioconfig.type
    this.frequency = radioconfig.frequency
    this.network = radioconfig.network
    this.client = radioconfig.client
    this.password = radioconfig.password
    this.idRC = radioconfig._id
  }

  deleteConfig(){
    var id = this.idRC;
    this.inputService.deleteRadioConfig(id).subscribe(data => {
      if (data.success) {
        this.inputService.getRadioConfig().subscribe(radioconfig => {
          this.radioconfigs = radioconfig
        });
      }
    }, err => {
      console.log(err);
    });

    this.type = ''
    this.frequency = null
    this.network = null
    this.client = null
    this.password = ''



  }

  constructor(private validateService: ValidateService,
    private flashService: FlashMessagesService,
    private inputService: InputService) {
    }

  ngOnInit() {
    this.inputService.getRadioConfig().subscribe(radioconfig => {
      this.radioconfigs = radioconfig
    });
  }

}
