import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HalfCircleSpinnerModule } from 'angular-epic-spinners';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
import { ListaStudentiDocenteComponent } from './components/registro-utenti/inside-app/lista-studenti-docente/lista-studenti-docente/lista-studenti-docente.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';
import { AssenzeComponent } from './components/registro-utenti/inside-app/assenze/assenze.component';
import { VotiComponent } from './components/registro-utenti/inside-app/voti/voti.component';
import { MenuSegreteriaComponent } from './components/segreteria/menu-segreteria/menu-segreteria.component';
import { VisualizzaStudentiEDocentiComponent } from './components/segreteria/visualizza-studenti-edocenti/visualizza-studenti-edocenti.component';
import { RegisterStudenteComponent } from './components/segreteria/register-studente/register-studente.component';
import { RegisterDocenteComponent } from './components/segreteria/register-docente/register-docente.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DatiAnagraficiStudenteComponent } from './components/registro-utenti/inside-app/dati-anagrafici-studente/dati-anagrafici-studente.component';
import { DatiAnagraficiDocenteComponent } from './components/registro-utenti/inside-app/dati-anagrafici-docente/dati-anagrafici-docente.component';
import { UpdateDocenteComponent } from './components/segreteria/update-docente/update-docente.component';
import { UpdateStudenteComponent } from './components/segreteria/update-studente/update-studente.component';

import { Interceptor } from './config/intercetptor';

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
    RegistroDocenteComponent,
    ListaStudentiDocenteComponent,
    PageNotFoundComponent,
    AssenzeComponent,
    VotiComponent,
    MenuSegreteriaComponent,
    VisualizzaStudentiEDocentiComponent,
    RegisterStudenteComponent,
    RegisterDocenteComponent,
    ContactUsComponent,
    DatiAnagraficiStudenteComponent,
    DatiAnagraficiDocenteComponent,
    UpdateDocenteComponent,
    UpdateStudenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    MatChipsModule, 
    HalfCircleSpinnerModule,
    NgMultiSelectDropDownModule,
    CKEditorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
