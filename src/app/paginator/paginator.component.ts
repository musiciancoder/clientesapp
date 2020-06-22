import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',

})
export class PaginatorComponent implements OnInit {

  @Input() paginador:any; //a ser inyectado en el clientes.component.html. Recordar que en clientes.component.ts definimos que  this.paginador = response;

  paginas:number[];

  constructor() { }

  ngOnInit(): void {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor,indice) => indice +1);
  }

}
