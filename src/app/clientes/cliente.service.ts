import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json'; //EL ARRAY
import { Cliente} from './cliente';
//import { Observable } from 'rxjs';
import { of, Observable } from 'rxjs';

@Injectable()
export class ClienteService {

  constructor() { }

  //El observable siempre es algun objeto del cliente. Existen Observadores, que son elementos del backend que se suscriben a este observable, para que
  //cuando cambie algo en algun observador(backend) se vea reflejado en el observable(frontend)

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES); //con el metodo 'of' se pasa el array de objetos a un observable (tambien llamado sujeto observable), que en este caso seria el array Cliente[]
  }
}
