import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
 // styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]; //El array que importamos lo definimos como atributo de clase
  constructor(private clienteService: ClienteService){} //Esta es inyeccion por dependencia por constructor. ver explicacion en Typescript.txt


  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes //esto en Typescript es funcion anonima function(clientes) => { this.clientes = clientes }
    );// this.clienteService.getClientes() es la ejecucion de inyeccion por dependencias
    //con el metodo subscribe subscribimos el observable this.clienteService.getClientes() a un observador que se pasa como argumento
    // ¿Por qué necesitaste decir que el array Cliente[] es parte de la clase con this.clientes = CLIENTES;? Acaso si no lo especificas en el método no lo reconoce al inicializar la app?
  }

}
