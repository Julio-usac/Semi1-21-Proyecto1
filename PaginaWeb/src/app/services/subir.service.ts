import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SubirService {

  url:string = "";

  constructor(private httpClient: HttpClient) { }

  upload(idarchivo, archivo, idusuario, tipoar, tipo){
    const data = { idarchivo, archivo, idusuario, tipoar, tipo };

    console.log(data);
  }
}
