import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import {ClienteService} from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router';

// ROUTING
const  routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'}, //  full es toda la ruta
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent}
];


@NgModule({
  declarations: [  // COMPONENTES
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)  //ROUTING
  ],
  providers: [ClienteService], // CLASES SERVICIO
  bootstrap: [AppComponent]
})
export class AppModule { }
