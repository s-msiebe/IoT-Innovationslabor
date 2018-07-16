import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateInput(user) {
    if (user.vorname == undefined || user.vorname == '' || user.nachname == '' || user.nachname == undefined) {
      return false;
    } else {
      return true;
    }

  }

  validateRadioConfig(radioconfig) {
    if (
      radioconfig.type == undefined || radioconfig.type == '' ||
      radioconfig.frequency == undefined || radioconfig.frequency == '' ||
      radioconfig.network == undefined || radioconfig.network == '' ||
      radioconfig.client == undefined || radioconfig.client == '' ||
      radioconfig.password == undefined || radioconfig.password == ''
    ) {
        return false;
    } else {
      return true;
    }
  }

}
