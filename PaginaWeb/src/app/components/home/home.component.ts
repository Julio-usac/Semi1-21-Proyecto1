import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  idUsuario: string = 'S;G';
  srcFoto = "Fondo1.png"
  name:string = "S;G";

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('id')

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
