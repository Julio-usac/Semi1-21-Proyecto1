import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RegistroService {

  url:string = "http://3.139.93.117:9000/crearusuario";

  constructor(private httpClient: HttpClient) { }

  singup(idimagen, foto, nombre, correo, pass){
    const data = { idimagen, foto, nombre, correo, pass };

    return this.httpClient.post(this.url, data).toPromise();
  }
}