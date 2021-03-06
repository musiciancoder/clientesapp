import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DirectivaComponent} from './directiva/directiva.component';
import {ClientesComponent} from './clientes/clientes.component';
import {FormComponent} from './clientes/form.component';
import {PaginatorComponent} from './paginator/paginator.component';

import {ClienteService} from './clientes/cliente.service';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

registerLocaleData(localeES, 'es'); //fecha en español
import {FormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {DetalleComponent} from './clientes/detalle/detalle.component';


// ROUTING
const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'}, //  full es toda la ruta
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
];


@NgModule({
  declarations: [  // COMPONENTES
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //PARA CONECTAR CON EL BACKEND DE SPRING
    FormsModule, // para trabajar con formularios
    RouterModule.forRoot(routes),  //ROUTING
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [ClienteService, // CLASES SERVICIO
    {provide: LOCALE_ID, useValue: 'es'}], //para pasar a formato fecha en español en los html
  bootstrap: [AppComponent]
})
export class AppModule {
}
