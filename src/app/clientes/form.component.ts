import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente:Cliente=new Cliente(); //a este atributo es donde se mapean los ngModel de los input
  public titulo:string = " Crear cliente";

  constructor(private clienteService : ClienteService,
              private router: Router) { }

  ngOnInit(): void {
  }

  //Al apretar el boton de enviar el formulario
  public create():void{
    this.clienteService.create(this.cliente).subscribe( // Observable
      response => this.router.navigate(['/clientes'])
    )

  }

}
