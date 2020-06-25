import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {ModalService} from './detalle/modal.service';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  // styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]; //El array que importamos lo definimos como atributo de clase
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clienteService: ClienteService, //Esta es inyeccion por dependencia por constructor. ver explicacion en Typescript.txt
              private activatedRoute: ActivatedRoute,
              private modalService: ModalService ) {
  }


  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => { // con paramMap convertimos a Observable

      let page: number = +params.get('page'); //operador + transforma un string a un number. Con esto extraemos la pagina del url activo

        if (!page) {
          page = 0;
        }

        this.clienteService.getClientes(page).pipe(
          tap(response => { //el tap no retorna nada, es un void.
            console.log('ClienteService:tap3: ');
            (response.content as Cliente[]).forEach(cliente => { //se usa forEach con tap, no map
              console.log(cliente.nombre);
            });
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response; //aca paso tod el json

        });
      }
    );
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

  //al hacer click al seleccionar un cliente
abrirModeal(cliente: Cliente){
    this.clienteSeleccionado = cliente    ;   //clienteSeleccionado llamado en el en selector detalle-cliente anidado en clientes.component.html
    this.modalService.abrirModal();

  }
}
