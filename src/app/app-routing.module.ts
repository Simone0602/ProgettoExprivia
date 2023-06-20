import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoClassiComponent } from './components/personale-ata/elenco-classi/elenco-classi.component';
import { ElencoDocentiComponent } from './components/personale-ata/elenco-docenti/elenco-docenti.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PasswordDimenticataComponent } from './components/password-dimenticata/password-dimenticata.component';
import { RegistroComponent } from './components/registro-utenti/registro/registro.component';
import { RegistroFamigliaComponent } from './components/registro-utenti/registro-famiglia/registro-famiglia.component';
import { AuthGuard } from './guard/auth-guard/auth.guard';
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

const routes: Routes = [
  { path: 'segreteria', component: MenuSegreteriaComponent,
    children: [
      { path: '', redirectTo: 'visualizza-studenti-e-docenti', pathMatch: 'full' },
      { path: 'visualizza-studenti-e-docenti', component: VisualizzaStudentiEDocentiComponent },
      { path: 'aggiungi-studente', component: RegisterStudenteComponent },
      { path: 'aggiungi-docente', component: RegisterDocenteComponent }
    ]
  },

  { path: '', component: MenuComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'elenco-docenti', component: ElencoDocentiComponent },
      { path: 'elenco-classi', component: ElencoClassiComponent },
      { path: ':user/registro', redirectTo: '/home', pathMatch: 'full' },
      { path: ':user/registro', component: RegistroComponent, canActivate: [AuthGuard],
        children: [
          { path: 'registro-famiglie', component: RegistroFamigliaComponent,
            children: [
              { path: '', redirectTo: 'dati-anagrafici', pathMatch: 'full' },
              { path: 'dati-anagrafici', component: DatiAnagraficiStudenteComponent },
              { path: 'assenze', component: AssenzeComponent },
              { path: 'voti', component: VotiComponent }
            ]
          },
          { path: 'registro-docente', component: RegistroDocenteComponent,
            children: [
              { path: '', redirectTo: 'dati-anagrafici', pathMatch: 'full' },
              { path: 'dati-anagrafici', component: DatiAnagraficiDocenteComponent },
              { path: 'lista-studenti', component: ListaStudentiDocenteComponent }
            ]
          }
        ]
      }
    ]
  },
  { path: 'contattaci', component: ContactUsComponent },
  { path: 'login/:user', component: LoginComponent },
  { path: 'password-dimenticata/:user', component: PasswordDimenticataComponent },
  { path: 'password-dimenticata/:user/:token', component: PasswordDimenticataComponent },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
