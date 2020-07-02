import {Component} from '@angular/core';
import {AuthService} from '../usuarios/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header', //etiqueta html
  templateUrl: './header.component.html' //archivo html
})
export class HeaderComponent {
  title:string= 'App Angular '; //a usar dentro del templateUrl como {{title}}

  //Al hacer click boton sign out
constructor(public authService: AuthService, private router: Router){
}

  logout():void{
  let username = this.authService.usuario.username;
    this.authService.logout();
    swal('Logout', `Has cerrado sesión`,);
    this.router.navigate(['/login']);
}

  
}
