import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})

export class SingupComponent implements OnInit {

  hide1 = true;
  hide2 = true;

  fileName:string = "";
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    let reader = new FileReader();
    
    this.fileName = file.name;

    reader.onload = function () {
      console.log(reader.result);
    }

    reader.onerror = function (error) {
      alert('Error al cargar la imagen!')
    }
  }
}
