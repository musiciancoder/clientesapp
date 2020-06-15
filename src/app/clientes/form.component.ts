import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente:Cliente=new Cliente(); //a este atributo es donde se mapean los ngModel de los input
  private titulo:string = " Crear cliente";

  constructor() { }

  ngOnInit(): void {
  }

  //Al apretar el boton de enviar el formulario
  public create():void{
    console.log("Clicked");
    console.log(this.cliente);
  }

}
