import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordDimenticataComponent } from './components/password-dimenticata/password-dimenticata.component';
import { ElencoDocentiComponent } from './components/personale-ata/elenco-docenti/elenco-docenti.component';
import { ElencoClassiComponent } from './components/personale-ata/elenco-classi/elenco-classi.component';
import { RegistroComponent } from './components/registro-utenti/registro/registro.component';
import { RegistroFamigliaComponent } from './components/registro-utenti/registro-famiglia/registro-famiglia.component';
import { RegistroDocenteComponent } from './components/registro-utenti/registro-docente/registro-docente.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    PasswordDimenticataComponent,
    ElencoDocentiComponent,
    ElencoClassiComponent,
    RegistroComponent,
    RegistroFamigliaComponent,
    RegistroDocenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
