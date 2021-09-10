import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SubirService {

  url:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/subirarchivo";

  constructor(private httpClient: HttpClient) { }

  upload(idarchivo, archivo, idusuario, tipoar, tipo){
    const data = { idarchivo, archivo, idusuario, tipoar, tipo };

    return this.httpClient.post(this.url, data).toPromise();
  }
}
