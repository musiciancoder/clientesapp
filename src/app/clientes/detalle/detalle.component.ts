import {Component, OnInit, Input} from '@angular/core';
import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import {ModalService} from './modal.service';

import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

//CLASE PARA SUBIR ARCHIVOS
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;//aca obtiene cliente desde clientes.component, ya que detalle.component esta anidado en clientes.component.html
  titulo: string = 'Detalle del cliente';
  private fotoSeleccionada: File;
  progreso: number =0;

  constructor(private clienteService: ClienteService,
              private modalService: ModalService) {

  }

  ngOnInit() {
   /* //ESTE CODIGO COMENTADO LO ELIMINO EN VIDEO 101, YA QUE OBTUVO EL CLIENTE NO DE PARAMETROS SINO CON @Input
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {

        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;

        });
      }
    });*/
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0]; //indice 0 del array de archivos. event es el evento del input en detalle.component.html
    this.progreso =0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      alert('El archivo debe ser de tipo imagen');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if (!this.fotoSeleccionada) {
      alert('Error. Debe seleccionar foto');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
          if (event.type===HttpEventType.UploadProgress){
            this.progreso = Math.round(event.loaded/event.total);
          } else if(event.type===HttpEventType.Response){
            let response:any = event.body;
            this.cliente = response.cliente as Cliente; //con esto podemos obtener el cliente
            //swal('La foto se ha subido correctamente', `La foto se ha subido con éxito: ${this.cliente.foto}`, 'success'  );
          }



        });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada =null;
    this.progreso =0;
  }

}
