import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AmigosService {

  url1:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/getusuarios";
  url2:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/getusuario";
  url3:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/agregaramigo";

  constructor(private httpClient: HttpClient) { }

  getUsuarios(id:string) {
    const data = { id }

    return this.httpClient.post(this.url1, data).toPromise();
  }

  buscar(nombre:string) {
    const data = { nombre };

    return this.httpClient.post(this.url2, data).toPromise();
  }

  follow(idusuario, idcuate){
    const data = { idusuario, idcuate };

    return this.httpClient.post(this.url3, data).toPromise();
  }
}
