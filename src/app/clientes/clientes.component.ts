import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  // styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]; //El array que importamos lo definimos como atributo de clase
  constructor(private clienteService: ClienteService) {
  } //Esta es inyeccion por dependencia por constructor. ver explicacion en Typescript.txt


  ngOnInit() {


  let page=0;
    this.clienteService.getClientes(page).pipe(
      tap(response => { //el tap no retorna nada, es un void.
        console.log('ClienteService:tap3: ');
        (response.content as Cliente[]).forEach(cliente => { //se usa forEach con tap, no map
          console.log(cliente.nombre);
        });
      })
    ).subscribe(response => this.clientes = response.content as Cliente[]);// this.clienteService.getClientes() es la ejecucion de inyeccion por dependencias
    //con el metodo subscribe subscribimos el observable this.clienteService.getClientes() a un observador que se pasa como argumento
    // ¿Por qué necesitaste decir que el array Cliente[] es parte de la clase con this.clientes = CLIENTES;? Acaso si no lo especificas en el método no lo reconoce al inicializar la app?
  }

  //Al presionar boton rojo eliminar
  delete(cliente: Cliente): void {
    // COPY/PASTE DE PAGINA DE SWEETALERT
    this.clienteService.delete(cliente.id).subscribe(
      response => {
        this.clientes = this.clientes.filter(cli => cli !== cliente); //la lista sin el cliente eliminado
        swal('Cliente Eliminado!', `Cliente ${cliente.nombre} eliminado con éxito`, 'success'); //swal es sweet alert //segunda promesa

      }
    );
  }


}
