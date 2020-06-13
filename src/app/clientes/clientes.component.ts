import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClIENTES} from './clientes.json'; //EL ARRAY


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
 // styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]; //El array que importamos lo definimos como atributo de clase


  constructor() { }

  ngOnInit(): void {
    this.clientes = ClIENTES;//¿Por qué necesitaste decir que el array Cliente[] es parte de la clase con this.clientes = CLIENTES;? Acaso si no lo especificas en el método no lo reconoce al inicializar la app?
  }

}
