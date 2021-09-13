import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArchivosService {

  //url:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/getarchivos";
  url:string = "http://localhost:9000/getarchivos";

  constructor(private httpClient: HttpClient) { }

  getArchivos(idusuario, tipo){
    const data = { idusuario, tipo };

    return this.httpClient.post(this.url, data).toPromise();
  }
}
