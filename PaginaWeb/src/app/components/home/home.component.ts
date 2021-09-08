import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  idUsuario: string = 'S;G';
  srcFoto:string = 'S;G';
  nombreUsuario:string = "S;G";

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('id')
    this.srcFoto = "https://archivos-21-p1.s3.us-east-2.amazonaws.com/fotos/" + localStorage.getItem('pick');
    this.nombreUsuario = localStorage.getItem('user');

    if (this.idUsuario != '0' && this.idUsuario != 'S;G'){

    } else {
      alert('Sesión caducada! Inicia sesión nuevamente!');
      this.cerrarSesion();
    }
  }

  cerrarSesion() {
    localStorage.setItem('id', '0');
    this.router.navigate(['login'])
  }
}
