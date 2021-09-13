import { ArchivosService } from '../../services/archivos.service';
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
  respuesta;
  archivosPublicos;
  archivosPrivados;

  constructor(public ArchivosService:ArchivosService, private router:Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('id')

    if (this.idUsuario == '0' || this.idUsuario == 'S;G') {
      alert('Sesión caducada! Inicia sesión nuevamente!');
      this.cerrarSesion();
    } else {
      this.srcFoto = "https://archivos-21-p1.s3.us-east-2.amazonaws.com/fotos/" + localStorage.getItem('pick');
      this.nombreUsuario = localStorage.getItem('user');
    }

    this.getPublicos();
    this.getPrivados();
  }

  cerrarSesion() {
    localStorage.setItem('id', '0');
    this.router.navigate(['login'])
  }

  async getPublicos(){
    this.respuesta = await this.ArchivosService.getArchivos(this.idUsuario, 'publico');
    this.archivosPublicos = JSON.parse(JSON.stringify(this.respuesta));
    var size = Object.keys(this.archivosPublicos).length;
    console.log(size);
    console.log(this.archivosPublicos);
  }

  async getPrivados(){
    this.respuesta = await this.ArchivosService.getArchivos(this.idUsuario, 'privado');
    this.archivosPrivados = JSON.parse(JSON.stringify(this.respuesta));
    var size = Object.keys(this.archivosPrivados).length;
    console.log(size);
    console.log(this.archivosPrivados);
  }

  getLink(nombre:string) {
    var aws = "https://archivos-21-p1.s3.us-east-2.amazonaws.com/fotos/";

    if (nombre.includes('.jpeg') || nombre.includes('.png') || nombre.includes('.jpg')) {
      return  aws + nombre;
    } else if (nombre.includes('.pdf')) {
      return aws + 'logoPDF.png';
    } else if (nombre.includes('.txt')) {
      return aws + 'logoTXT.png';
    }
  }

  getLinkRef(nombre:string) {
    var aws = "https://archivos-21-p1.s3.us-east-2.amazonaws.com/fotos/";

    return  aws + nombre;
  }
}
