import { PublicosService } from 'src/app/services/publicos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publics',
  templateUrl: './publics.component.html',
  styleUrls: ['./publics.component.scss']
})

export class PublicsComponent implements OnInit {

  idUsuario:string = 'S;G';

  nombreA:string = "";

  respuesta;
  archivos;

  constructor(public PublicosService:PublicosService, private router:Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('id');

    if (this.idUsuario == '0' || this.idUsuario == 'S;G') {
      alert('Sesión caducada! Inicia sesión nuevamente!');
      this.cerrarSesion();
    }

    this.getArchivos();
  }

  cerrarSesion() {
    localStorage.setItem('id', '0');
    this.router.navigate(['login'])
  }

  async getArchivos() {

  }

  async buscar(){
    if (this.nombreA == "") {
      this.getArchivos();
    } else {
      /*this.respuesta = await this.AmigosService.buscar(this.nombreB);
      this.usuarios = JSON.parse(JSON.stringify(this.respuesta));*/
    }
  }
}
