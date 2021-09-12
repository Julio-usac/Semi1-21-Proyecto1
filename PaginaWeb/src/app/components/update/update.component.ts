import { EditarService } from '../../services/editar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {

  hide = true;

  idUsuario: string = 'S;G';
  respuesta;
  archivos;

  idFile:string = "";
  pass:string = "";
  nombre:string = "";
  tipo:string = "";

  constructor(public EditarService:EditarService, private router:Router) { }

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
    this.respuesta = await this.EditarService.getArchivos(this.idUsuario);
    this.archivos = JSON.parse(JSON.stringify(this.respuesta));
    var size = Object.keys(this.archivos).length;
    console.log(this.archivos);
    if (this.archivos.mensaje) {
      alert('Error de conexion!');
      return;
    }
  }

  selected(event: MatSelectChange) {
    var size = Object.keys(this.archivos).length;

    for (var i=0; i<size; i++) {
      if (this.archivos[i].idarchivo == this.idFile) {
        this.nombre = this.archivos[i].nombre;
        this.tipo = this.archivos[i].tipo;
        i=size;
      }
    }
  }

  async update(){
    if (this.idFile == "") {
      alert('Campo Archivo vacio!');
      return;
    }

    if (this.nombre == "") {
      alert('Campo Nombre vacio!');
      return;
    }

    if (this.pass == "") {
      alert('Campo Contraseña vacio!');
      return;
    }

    let respuesta = await this.EditarService.update(this.idUsuario,this.pass, this.idFile, this.nombre, this.tipo);
    const obj = JSON.parse(JSON.stringify(respuesta));

    if (obj.mensaje == "error") {
      alert('Contraseña incorrecta!');
    } else if (obj.mensaje == "error1") {
      alert('Error de conexion!');
    } else if (obj.mensaje == "error2") {
      alert('Error al cambiar nombre!')
    } else if (obj.mensaje == "error3") {
      alert('Error al cambiar visivilidad!')
    } else if (obj.mensaje == "listo") {
      alert('Cambios guardados!');

      this.idFile = "";
      this.pass = "";
      this.nombre = "";
      this.tipo = "";
      this.obtenerArchivos();
    }
  }
}
