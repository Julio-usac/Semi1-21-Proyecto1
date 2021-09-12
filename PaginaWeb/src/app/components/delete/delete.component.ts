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
  respuesta;
  archivos;

  idFile:string = "";
  pass:string = "";

  constructor(public EliminarService:EliminarService, private router:Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('id')

    if (this.idUsuario == '0' || this.idUsuario == 'S;G') {
      alert('Sesión caducada! Inicia sesión nuevamente!');
      this.cerrarSesion();
    }

    this.obtenerArchivos();
  }

  cerrarSesion() {
    localStorage.setItem('id', '0');
    this.router.navigate(['login'])
  }

  async obtenerArchivos(){
    this.respuesta = await this.EliminarService.getArchivos(this.idUsuario);
    this.archivos = JSON.parse(JSON.stringify(this.respuesta));
    var size = Object.keys(this.archivos).length;
    console.log(size);
    console.log(this.archivos);

    if (this.archivos.mensaje) {
      alert('Error!');
      return;
    }
  }

  async delete(){
    if (this.idFile == "") {
      alert('Campo Archivo vacio!');
      return;
    }

    if (this.pass == "") {
      alert('Campo Contraseña vacio!');
      return;
    }

    let respuesta = await this.EliminarService.delete(this.idUsuario, this.idFile, this.pass);
    const obj = JSON.parse(JSON.stringify(respuesta));
    
    if (obj.mensaje == "error") {
      alert('Contraseña incorrecta!');
    } else if (obj.mensaje == "error1" || obj.mensaje == "error2") {
      alert('Error de conexion!');
    }else if (obj.mensaje == "listo") {
      alert('Archivo borrado!');
      
      this.idFile = "";
      this.pass = "";
      this.obtenerArchivos();
    }
  }
}
