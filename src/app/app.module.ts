import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ServiceDatiStudenteService } from './service-dati/studente/service-dati-studente.service';
import { RicevitoreStudenteService } from './service-invio-dati/studente/ricevitore-studente.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [ServiceDatiStudenteService, RicevitoreStudenteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
