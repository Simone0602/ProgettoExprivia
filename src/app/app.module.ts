import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
>>>>>>> c028644f93635deb0cbef7d78e6dae09e8c373b4
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD

=======
import { ServiceDatiStudenteService } from './service-dati/studente/service-dati-studente.service';
import { RicevitoreStudenteService } from './service-invio-dati/studente/ricevitore-studente.service';
>>>>>>> c028644f93635deb0cbef7d78e6dae09e8c373b4


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    NgbModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
=======
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [ServiceDatiStudenteService, RicevitoreStudenteService],
>>>>>>> c028644f93635deb0cbef7d78e6dae09e8c373b4
  bootstrap: [AppComponent]
})
export class AppModule { }
