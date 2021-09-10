import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AccesoService {

  url:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/iniciarsesion";

  constructor(private httpClient: HttpClient) { }

  login(auth, pass){
    const data = { auth, pass };

    return this.httpClient.post(this.url, data).toPromise();
  }
}