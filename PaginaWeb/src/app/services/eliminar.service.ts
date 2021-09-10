import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EliminarService {

  url:string = "http://bc-21-p1-290798132.us-east-2.elb.amazonaws.com:9000/eliminararchivo";

  constructor() { }
}
