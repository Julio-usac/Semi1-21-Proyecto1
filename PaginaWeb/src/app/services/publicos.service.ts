import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PublicosService {

  url1:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/obtenerpublicos";
  url2:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/obtenerpublico";

  constructor(private httpClient: HttpClient) { }

  getPublicos(id:string){
    const data = { id }

    return this.httpClient.post(this.url1, data).toPromise();
  }

  buscar(id:string, nombre:string) {
    const data = { id, nombre }

    return this.httpClient.post(this.url2, data).toPromise();
  }
}
