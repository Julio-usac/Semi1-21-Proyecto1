import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AmigosService {

  /*url1:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/getusuarios";
  url2:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/getusuario";*/
  url1:string = "http://localhost:9000/getusuarios";
  url2:string = "http://localhost:9000/getusuario";

  constructor(private httpClient: HttpClient) { }

  getUsuarios() {
    return this.httpClient.get(this.url1).toPromise();
  }

  buscar(nombre:string) {
    const data = { nombre };

    return this.httpClient.post(this.url2, data).toPromise();
  }
}
