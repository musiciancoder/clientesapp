import {Component, OnInit} from '@angular/core';
import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

//CLASE PARA SUBIR ARCHIVOS
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  titulo: string= "Detalle del cliente";
  private fotoSeleccionada: File;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
        let id: number = +params.get('id');
        if (id) {

          this.clienteService.getCliente(id).subscribe(cliente => {
            this.cliente = cliente;

          });
        }
      });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0]; //indice 0 del array de archivos. event es el evento del input en detalle.component.html
    console.log(this.fotoSeleccionada);
  }

  subirFoto(){
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(cliente => {
        this.cliente = cliente;
        console.log( this.cliente);
       //swal('La foto se ha subido correctamente', `La foto se ha subido con éxito: ${this.cliente.foto}`, 'success'  );

      });

  }

}
