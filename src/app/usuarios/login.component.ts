import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario(); //inicializacion del Usuario da lo mismo hacerlo fuera o dentro del constructor
  }

  ngOnInit() {
  }

  login(): void {
    console.log(this.usuario);

    if (this.usuario.username == null || this.usuario.password == null) {
      //alert('Error Login, username o password vacías!')
      swal('Error Login', 'Username o password vacías!');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);//JSON
      let payload = JSON.parse(atob(response.access_token.split(".")[1])); //atob pasa de encriptado base 64 a string, con split podemos separar las secciones del token (header, payload y firma). con JSON.parse lo pasamos a JSON
      console.log(payload);
      this.router.navigate(['/clientes']);
      swal('Login',`Hola ${payload.user_name}, has iniciado sesión con éxito` )
      //alert(`Hola ${payload.user_name}`);

    });
  }


}
