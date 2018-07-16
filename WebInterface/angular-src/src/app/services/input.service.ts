import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InputService {

  user: any;


  constructor(private http: Http) { }

  //put UUID nur die ID wird gesetzt
  //get informationen vom board werden geholt
  //post nur die Radio Config wird gesetzt

  startProxy(device){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/startProxy?name='+device,{headers:headers}).map(res => res.json());
  }

  closeProxy(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/closeProxy',{headers:headers}).map(res => res.json());
  }

  saveDevice(device){
    let headers = new Headers();
    return this.http.post('http://localhost:3000/api/saveDevice',device,{headers:headers}).map(res => res.json());
  }

  getDeviceInfo(){
    return this.http.get('http://localhost:8080/').map(res => res.json());
  }

  putUUID(jsonLD){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:8080/',jsonLD,{headers:headers});
  }

  postRadioConfig(radioconfig){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/',radioconfig,{headers:headers}).map(res => res.json());
  }

  getDevice(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/getDevice',{headers:headers}).map(res => res.json());
  }

  showDevice(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/showDevice',{headers:headers}).map(res => res.json());
  }

  inputUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers}).map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/getData',{headers:headers}).map(res => res.json());
  }

  getRadioConfig(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/getConfig',{headers:headers}).map(res => res.json());
  }

  deleteRadioConfig(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.delete('http://localhost:3000/api/deleteConfig?id='+id,{headers:headers}).map(res => res.json());
  }

  updateRadioConfig(radioconfig){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.put('http://localhost:3000/api/updateConfig',radioconfig,{headers:headers}).map(res => res.json());
  }

  inputRadioConfig(radioconfig){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/addConfig',radioconfig,{headers:headers}).map(res => res.json());
  }

}
