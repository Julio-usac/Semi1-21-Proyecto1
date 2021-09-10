import { AccesoService } from '../../services/acceso.service'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  hide = true; //para el boton de visibilidad de contraseña

  //vars
  credencial:string = "";
  pass:string = "";

  constructor(public AccesoService:AccesoService, private router:Router) { 
    localStorage.setItem('id', '0');
  }

  ngOnInit(): void {
  }

  async login(){
    if (this.credencial == "") {
      alert('Campo Credencial vacio!');
      return;
    }

    if (this.pass == "") {
      alert('Campo Contraseña vacio!');
      return;
    }

    let respuesta = await this.AccesoService.login(this.credencial, this.pass);
    const obj = JSON.parse(JSON.stringify(respuesta));
    var size = Object.keys(obj).length;
    
    if (size == 1) {
      if (obj.mensaje == "el usuario no existe") {
        alert("El usuario no existe!");
      } else if (obj.mensaje == "Contraseña no coincide") {
        alert("Contraseña incorrecta!");
      }
    } else if (size == 3) {
      localStorage.setItem('id', obj.id);
      localStorage.setItem('user', obj.nombre);
      localStorage.setItem('pick', obj.foto);
      this.router.navigate(['home']);
    }
  }
}