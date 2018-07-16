import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeviceComponent } from './components/device/device.component';
import { HomeComponent } from './components/home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { RadioComponent } from './components/radio/radio.component';
import { ValidateService } from './services/validate.service';
import { InputService } from './services/input.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProfileComponent } from './components/profile/profile.component';

import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'radio', component: RadioComponent },
  { path: 'profile', component: ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DeviceComponent,
    HomeComponent,
    RadioComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [ValidateService, FlashMessagesService, InputService],
  bootstrap: [AppComponent]
})
export class AppModule { }
