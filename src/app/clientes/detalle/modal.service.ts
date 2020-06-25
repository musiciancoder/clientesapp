import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  private _notificarUpload = new EventEmitter<any>()

  constructor() {}

  get notificarUpload(): EventEmitter<any> { //en typescript esto es lo mismo que get_notificarUpload(){} en JS
    return this._notificarUpload
  }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }

}
