import {Injectable} from '@angular/core';
import {formatDate, DatePipe} from '@angular/common';
import localeES from '@angular/common/locales/es';
//import {CLIENTES} from './clientes.json'; //EL ARRAY
import {Cliente} from './cliente';
import {of, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Region} from './region';

@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'; //esto es atributo de clase, por algo despues lo llama con this

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { //INYECCION DE DEPENDENCIAS, CON ESTO http: HttpClient queda definida como atributo de la clase

  }

  //PARA DEVOLVER AL LOGIN SI HAY ACCESO NO AUTORIZADO (401) O PROHIBIDO (403)
  private isNoAutorizado(e): boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }

    return false;
  }

  //Para obtener una lista de regiones
  getRegiones(): Observable<Region[]>{
   return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
  }

  //El observable siempre es algun objeto del cliente. Existen Observadores, que son elementos del backend que se suscriben a este observable, para que
  //cuando cambie algo en algun observador(backend) se vea reflejado en el observable(frontend)

  //PARA OBTENER LA LISTA DE CLIENTES PAGINADA
  getClientes(page:number ): Observable<any> {
    //return of(CLIENTES); //con el metodo 'of' se pasa el array de objetos a un observable (tambien llamado sujeto observable), que en este caso seria el array Cliente[]
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(

      tap((response:any) => { //con esto le indicamos que la respuesta es un json

        (response.content as Cliente[]).forEach(cliente => { //convertimos el content del JSON a Cliente[]. Content aparece al agregar paginacion
          console.log(cliente.nombre);
        });
      }),

      map((response:any) => {
        (response.content as Cliente[]).map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();

            //let datePipe = new DatePipe('es'); //en español
            //cliente.createAt=datePipe.transform(cliente.createAt, 'EEEE dd, MMMM-yyyy');
            return cliente; //al retornar cambia el tipo de la respuesta a Cliente []
          });

            return response; //aca  cambia a tipo any
        }),

      tap(response => {
       //al no retornar mas abajo, no cambia el tipo (sin embargo esto permite verlo en la consola)


        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
    );

  }



  //PARA CREAR UN CLIENTE

  /*PRIMERA FORMA (video 62 de manejo de errores frontend)
  create(cliente:Cliente) : Observable<any>{ //con any podemos recibir tanto json como cliente, con <Cliente> podemos recibir solo del tipo Cliente */

  /*SEGUNDA FORMA*/
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente), // response es el json que recibimos del backend, que en nuestro caso trae el mensaje y el cliente. Con esta linea pasamos el texto response.cliente al tipo Cliente
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);

        }
        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        console.error(e.error.error);
        //alert(`Hay un error: ${e.error.error}`)
        // swal('Error al crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //PARA OBTENER UN CLIENTE POR ID
  getCliente(id): Observable<Cliente> {
    //  console.log(typeof (this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)));
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);

        }


        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //PARA ACTUALIZAR UN CLIENTE
  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);

        }

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //PARA BORRAR CLIENTE
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);

        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  //SUBIR IMAGEN (en video 100 cambia el tipo de llamada de http a httpRequest
  subirFoto(archivo: File, id):Observable<HttpEvent<{}>>{
    let formData = new FormData(); //clase nativa de JavaScript
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`, formData, {
        reportProgress: true});  //barra de progreso
        return this.http.request(req).pipe(
          catchError(e => {
            this.isNoAutorizado(e);
            return throwError(e);
          })
        );

  }
}
