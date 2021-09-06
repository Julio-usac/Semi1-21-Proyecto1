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

  fileName:string = "";

  //vars
  imagenB64:string = "S;G";
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  //---------- Funcion para abrir imagen
  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    alert(file.type);
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
    console.log(this.imagenB64);
  }
}
