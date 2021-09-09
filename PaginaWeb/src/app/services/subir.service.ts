import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SubirService {

  url:string = "http://18.221.55.167:9000/subirarchivo";

  constructor(private httpClient: HttpClient) { }

  upload(idarchivo, archivo, idusuario, tipoar, tipo){
    const data = { idarchivo, archivo, idusuario, tipoar, tipo };

    return this.httpClient.post(this.url, data).toPromise();
  }
}
