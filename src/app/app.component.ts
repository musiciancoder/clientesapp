import { Component } from '@angular/core';

@Component({ //clase de angular
  selector: 'app-root', //esta es etiqueta html q va en el body de index.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] //estilo
})
export class AppComponent {
  title = 'Bienvenido a Angular'; //este es un atributo de clase
  curso: string = 'Curso Spring 5 con Angular 7'; //este es otro atributo de la clase
  profesor: string = 'Andres Guzman'

  //curso = 'Curso Spring 5 con Angular 7'; //tambien se puede asi
}
