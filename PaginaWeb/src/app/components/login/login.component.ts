import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true; //para el boton de visibilidad de contraseña

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
