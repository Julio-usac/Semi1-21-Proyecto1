import { RegistroService } from '../../services/registro.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})

export class SingupComponent implements OnInit {

  hide1 = true; //para el boton de visibilidad de contraseña
  hide2 = true;

  //vars
  usuario:string = "";
  email:string = "";
  pass:string = "";
  passC:string = "";
  fileName:string = "";
  imagenB64:string = "";
  
  constructor(public RegistroService: RegistroService, private router:Router) { }

  ngOnInit(): void {
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

  //---------- Funcion para obtener B64 de la imagen
  handleFile(event) {
    var binaryString = event.target.result;
    this.imagenB64= btoa(binaryString);
  }

  //---------- Funcion para registrar usuario
  async singup(){
    if (this.usuario == "") {
      alert('Campo Usuario vacio!');
      return;
    }

    if (this.email == "") {
      alert('Campo Correo vacio!');
      return;
    }

    if (this.pass == "") {
      alert('Campo Contraseña vacio!');
      return;
    }

    if (this.passC != this.pass) {
      alert('Las contraseñas no coinciden!');
      return;
    }

    if (this.imagenB64 == "") {
      alert('Campo Foto vacio!');
      return;
    }

    let respuesta = await this.RegistroService.singup(this.fileName, this.imagenB64, this.usuario, this.email, this.pass);
    const obj = JSON.parse(JSON.stringify(respuesta));
    
    if (obj.mensaje == 'Registrado') {
      alert('Usuario Registrado!');
      this.router.navigate(['login']);
    } else {
      alert('Error al registrar usuario!');
    }
  }
}