import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Usuario} from './usuario';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//CLASE SERVICIO PARA ENVIAR DATOS DE USUARIO AL BACKEND
export class AuthService {

  constructor(private http:HttpClient) { }


  login(usuario:Usuario):Observable<any>{
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345'); //encriptar base 64
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic ' + credenciales});

    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password', usuario.password);

    console.log( params.toString());

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders})

  }

}
