import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RegistroService {

  url:string = "http://18.221.55.167:9000/crearusuario";

  constructor(private httpClient: HttpClient) { }

  singup(idimagen, foto, nombre, correo, pass){
    const data = { idimagen, foto, nombre, correo, pass };

    return this.httpClient.post(this.url, data).toPromise();
  }
}