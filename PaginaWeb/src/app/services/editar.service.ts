import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EditarService {

  url1:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/archivoseditar";
  url2:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/editararchivo";

  constructor(private httpClient: HttpClient) { }

  getArchivos(idusuario){
    const data = { idusuario };

    return this.httpClient.post(this.url1, data).toPromise();
  }

  update(idusuario, pass, idarchivo, nuevonombre, tipo){
    const data = { idusuario, pass, idarchivo, nuevonombre, tipo };

    return this.httpClient.post(this.url2, data).toPromise();
  }
}
