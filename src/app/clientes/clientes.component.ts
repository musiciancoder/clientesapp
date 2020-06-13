import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
 // styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    {id: 1,nombre:'Andres', apellido:'Guzman' , email:'profesor@bolsa', createAt: '2017-12-11'},
    {id: 2,nombre:'Marcelo', apellido:'Salas' , email:'matador@gmail', createAt: '2017-12-14'},
    {id: 3,nombre:'Ivan', apellido:'Zamorano' , email:'bambam@gmail', createAt: '2017-12-15'},
    {id: 4,nombre:'Juan_Carlos', apellido:'Letelier' , email:'llanero@gmail', createAt: '2017-12-15'},
    {id: 5,nombre:'Patricio', apellido:'Yañez' , email:'patoyañez@gmail', createAt: '2017-12-16'},
    {id: 6,nombre:'Carlos', apellido:'Caszely' , email:'chino@gmail', createAt: '2017-12-17'},
    {id: 7,nombre:'Eduardo', apellido:'Vargas' , email:'edu@gmail', createAt: '2017-12-18'},
    {id: 8,nombre:'Alexis', apellido:'Sanchez' , email:'maravilla@gmail', createAt: '2017-12-19'},
    {id: 9,nombre:'Leonel', apellido:'Sanchez' , email:'leonel@gmail', createAt: '2017-12-21'},
    {id: 10,nombre:'Ruben', apellido:'Martinez' , email:'ruben@gmail', createAt: '2017-12-21'},
    {id: 11,nombre:'Hugo', apellido:'Rubio' , email:'pajaro@gmail', createAt: '2017-12-21'},

  ]


  constructor() { }

  ngOnInit(): void {
  }

}
