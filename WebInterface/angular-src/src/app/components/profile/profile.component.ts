import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputService } from '../../services/input.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object = [];

  inputfeld: String;

  constructor(private inputService: InputService, private router: Router, private flashService: FlashMessagesService) { }

  ngOnInit() {
    this.inputService.getProfile().subscribe(profile => {
      this.user = profile
      console.log(profile)
    },
      err => {
        console.log(err);
        return false;
      });
  }

  showAlert(person) {
    this.flashService.show(person.nachname);
  }

}
