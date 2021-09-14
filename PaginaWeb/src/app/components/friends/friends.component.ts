import { AmigosService } from 'src/app/services/amigos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit {

  idUsuario:string = 'S;G';

  nombreB:string = "";

  respuesta;
  usuarios;

  constructor(public AmigosService:AmigosService, private router:Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('id');

    /*if (this.idUsuario == '0' || this.idUsuario == 'S;G') {
      alert('Sesión caducada! Inicia sesión nuevamente!');
      this.cerrarSesion();
    }*/

    this.getUsuarios();
  }

  cerrarSesion() {
    localStorage.setItem('id', '0');
    this.router.navigate(['login'])
  }

  getFoto(foto:string) {
    return "https://archivos-21-p1.s3.us-east-2.amazonaws.com/fotos/" + foto;
  }

  getPublicos(cantidad:string) {
    return cantidad + " archivos publicos";
  }

  async getUsuarios() {
    this.respuesta = await this.AmigosService.getUsuarios();
    this.usuarios = JSON.parse(JSON.stringify(this.respuesta));
  }

  async buscar(){
    if (this.nombreB == "") {
      this.getUsuarios();
    } else {
      this.respuesta = await this.AmigosService.buscar(this.nombreB);
    this.usuarios = JSON.parse(JSON.stringify(this.respuesta));
    }
  }

  follow(idusuario:string){

  }
}
