import {Component} from '@angular/core';

@Component({
  selector: 'app-header', //etiqueta html
  templateUrl: './header.component.html' //archivo html

})
export class HeaderComponent {
  title:string= 'App Angular '; //a usar dentro del templateUrl como {{title}}



  
}
