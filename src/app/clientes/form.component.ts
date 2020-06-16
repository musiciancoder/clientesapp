import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente(); //a este atributo es donde se mapean los ngModel de los input
  public titulo: string = ' Crear cliente';

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  // Al apretar boton editar cliente en el listado de clientes
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => { //params en morado pasa los parametros de la ruta al tipo observable<Params>
        let id = params['id']; //primero busca los parametros en el frontend, igual se hace por subscripcion
        if (id) {
          this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
        }
      }
    );
  }

  //Al apretar el boton de enviar el formulario para crear un cliente
  public create(): void {
    this.clienteService.create(this.cliente).subscribe( // Observable (lo que se envia)
      cliente => { //Observador (respuesta)
        this.router.navigate(['/clientes']), //primera promesa
          swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success'); //swal es sweet alert //segunda promesa
      }
    );

  }

  // Al apretar boton editar en el formulario de envio de cliente
  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(cliente=>{
        this.router.navigate(['/clientes']), //primera promesa
          swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, 'success');

      })
  }


}
