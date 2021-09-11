import { EliminarService } from '../../services/eliminar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent implements OnInit {

  hide = true;

  idUsuario: string = 'S;G';

  idfile:string = "";
  pass:string = "";

  constructor(public EliminarService:EliminarService, private router:Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('id')

    if (this.idUsuario == '0' || this.idUsuario == 'S;G') {
      alert('Sesión caducada! Inicia sesión nuevamente!');
      this.cerrarSesion();
    }
  }

  cerrarSesion() {
    localStorage.setItem('id', '0');
    this.router.navigate(['login'])
  }

  async delete(){

  }
}
