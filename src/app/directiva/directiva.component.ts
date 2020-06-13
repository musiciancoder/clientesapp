import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  //listaCurso y habilitar no son campos de clase como en Java, son atributos de la clase

  listaCurso:string[]=['Typescript','Javascript','Java SE', 'C#', 'PHP'];

  habilitar: boolean = true;

  constructor() { }

setHabilitar(): void { //metodo usado al hacer click en boton ocultar
  this.habilitar =(this.habilitar==true)? false : true
}

}
