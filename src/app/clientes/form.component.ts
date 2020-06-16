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

  // Al apretar boton editar cliente
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
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
        this.router.navigate(['/clientes']),
          swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success'); //swal es sweet alert
      }
    );

  }

}
