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

  // Al apretar boton editar cliente en el listado de clientes. Se llama en ngOninit
  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => { //params en morado pasa los parametros de la ruta al tipo observable<Params>
        let id = params['id']; //primero busca los parametros en el frontend, igual se hace por subscripcion
        if (id) {
          this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
        }
      }
    );
  }

  // NOTA: CREATE Y UPDATE TIENEN DIFERENTES SINTAXIS POR LO EXPLICADO AL FINAL DEL VIDEO 62.


  //Al apretar el boton de enviar el formulario para crear un cliente
  public create(): void {//sintaxis usando map en metodo create de la clase de servicio
    this.clienteService.create(this.cliente).subscribe( // Observable (lo que se envia)
      cliente => { //Observador (respuesta)
        this.router.navigate(['/clientes']), //primera promesa
          swal('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con exito`, 'success'); //swal es sweet alert //segunda promesa
      }
    );

  }

  // Al apretar boton editar en el formulario de envio de cliente
  update(): void {  //sintaxis USANDO <any> en metodo update de la clase de servicio
    this.clienteService.update(this.cliente)
      .subscribe(json=>{ //para escribir completo el json (el mensaje mas el cliente). En el metodo de la clase de servicio debemos cambiar el tipo <Cliente> por <any>
        this.router.navigate(['/clientes']), //primera promesa
          swal('Cliente Actualizado', `${json.mensaje}:${json.cliente.nombre}`, 'success');
      })
  }


}
