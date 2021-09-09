import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {

  hide = true;

  idUsuario: string = 'S;G';

  //vars
  fileName:string = "";
  archivoB64:string = "";
  newFileName:string = "";
  vis:string = "1";
  pass:string = "";

  constructor(private router:Router) { }

  ngOnInit(): void {
    /*this.idUsuario = localStorage.getItem('id')

    if (this.idUsuario == '0' || this.idUsuario == 'S;G') {
      alert('Sesión caducada! Inicia sesión nuevamente!');
      this.cerrarSesion();
    }*/
  }

  //---------- Funcion para abrir imagen
  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    this.fileName = file.name;
    
    var reader = new FileReader();

    reader.onload = this.handleFile.bind(this);
    reader.readAsBinaryString(file);
    reader.onerror = function (error) {
      alert('Error al cargar la imagen!')
    }
  }

  //---------- Funcion para obtener B64 del archivo
  handleFile(event) {
    var binaryString = event.target.result;
    this.archivoB64= btoa(binaryString);
    console.log(this.archivoB64);
  }

  cerrarSesion() {
    localStorage.setItem('id', '0');
    this.router.navigate(['login'])
  }
}
