import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EliminarService {

  url1:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/archivoseliminar";
  url2:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/eliminararchivo";
  

  constructor(private httpClient: HttpClient) { }

  getArchivos(idusuario){
    const data = { idusuario };

    return this.httpClient.post(this.url1, data).toPromise();
  }

  delete(idarchivo, pass){
    const data = { idarchivo, pass };

    return this.httpClient.post(this.url2, data).toPromise();
  }
}
