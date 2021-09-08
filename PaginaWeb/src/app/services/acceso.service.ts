import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AccesoService {

  url:string = "http://3.139.93.117:9000/iniciarsesion";

  constructor(private httpClient: HttpClient) { }

  login(auth, pass){
    const data = { auth, pass };

    return this.httpClient.post(this.url, data).toPromise();
  }
}