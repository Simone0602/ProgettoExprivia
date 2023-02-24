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
import { AuthGuard } from './secure/guard/auth-guard/auth.guard';
import { RegistroDocenteComponent } from './components/registro-utenti/registro-docente/registro-docente.component';
import { ListaStudentiDocenteComponent } from './components/registro-utenti/inside-app/lista-studenti-docente/lista-studenti-docente/lista-studenti-docente.component';
import { DatiAnagraficiComponent } from './components/registro-utenti/inside-app/dati-anagrafici/dati-anagrafici.component';
import { RoleGuard } from './secure/guard/role-guard/role.guard';

const routes: Routes = [ 
  { path: '', component: MenuComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'elenco-docenti', component: ElencoDocentiComponent },
      { path: 'elenco-classi', component: ElencoClassiComponent },
      { path: ':user', redirectTo: '/home', pathMatch: 'full' },
      { path: ':user', component: RegistroComponent, canActivate: [AuthGuard], 
        children: [
          { path: 'registro-famiglie', component: RegistroFamigliaComponent, canActivate: [RoleGuard],
            children: [
              { path: '', redirectTo: 'dati-anagrafici', pathMatch: 'full' },
              { path: 'dati-anagrafici', component: DatiAnagraficiComponent }
            ] 
          },
          { path: 'registro-docente', component: RegistroDocenteComponent, canActivate: [!RoleGuard],
            children: [
              { path: '', redirectTo: 'dati-anagrafici', pathMatch: 'full' },
              { path: 'dati-anagrafici', component: DatiAnagraficiComponent },
              { path: 'lista-studenti', component: ListaStudentiDocenteComponent }
            ]
          }
        ]
      }
    ]
  },
  { path: 'login/:user', component: LoginComponent },
  { path: 'password-dimenticata/:user', component: PasswordDimenticataComponent },
  { path: 'password-dimenticata/:user/:token', component: PasswordDimenticataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
