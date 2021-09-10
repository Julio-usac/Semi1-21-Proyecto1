import { SubirService } from '../../services/subir.service';
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
  ext:string = 'S;G';

  //vars
  fileName:string = "";
  archivoB64:string = "";
  newFileName:string = "";
  vis:string = "privado";
  pass:string = "";

  constructor(public SubirService:SubirService, private router:Router) { }

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('id')

    if (this.idUsuario == '0' || this.idUsuario == 'S;G') {
      alert('Sesión caducada! Inicia sesión nuevamente!');
      this.cerrarSesion();
    }
  }

  //---------- Funcion para abrir imagen
  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    this.fileName = file.name;
    this.ext = file.type;
    
    var reader = new FileReader();

    reader.onload = this.handleFile.bind(this);
    reader.readAsBinaryString(file);
    reader.onerror = function (error) {
      alert('Error al cargar el archivo!')
    }
  }

  //---------- Funcion para obtener B64 del archivo
  handleFile(event) {
    var binaryString = event.target.result;
    this.archivoB64= btoa(binaryString);
  }

  cerrarSesion() {
    localStorage.setItem('id', '0');
    this.router.navigate(['login'])
  }

  async upload(){
    if (this.fileName == "") {
      alert('Campo Archivo vacio!');
      return;      
    }

    if (this.newFileName == "") {
      alert('Campo Nombre vacio!');
      return;      
    }

    if (this.pass == "") {
      alert('Campo Contraseña vacio!');
      return;      
    }

    if (this.ext == "image/png") {
      this.newFileName = this.newFileName + '.png';
      this.ext = ".png";
    } else if (this.ext == "image/jpg") {
      this.newFileName = this.newFileName + '.jpg';
      this.ext = ".jpg";
    } else if (this.ext == "image/jpeg") {
      this.newFileName = this.newFileName + '.jpeg';
      this.ext = ".jpeg";
    } else if (this.ext == "application/pdf") {
      this.newFileName = this.newFileName + '.pdf';
      this.ext = ".pdf";
    } else if (this.ext == "text/plain") {
      this.newFileName = this.newFileName + '.txt';
      this.ext = ".txt";
    } else {
      alert('Error con el formato del archivo!');
      return;
    }

    let respuesta = await this.SubirService.upload(this.newFileName, this.archivoB64, this.idUsuario, this.vis, this.ext);
    const obj = JSON.parse(JSON.stringify(respuesta));
    
    if (obj.mensaje == "listo") {
      alert('Archivo subido!');
    } else if (obj.mensaje == "error") {
      alert('Formato de archivo invalido!');
    }

    this.fileName = "";
    this.archivoB64 = "";
    this.newFileName = "";
    this.vis = "privado";
    this.pass = "";
  }
}
