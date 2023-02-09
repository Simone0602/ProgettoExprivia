import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElencoClassiComponent } from './components/personale-ata/elenco-classi/elenco-classi.component';
import { ElencoDocentiComponent } from './components/personale-ata/elenco-docenti/elenco-docenti.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PasswordDimenticataComponent } from './components/password-dimenticata/password-dimenticata.component';
import { RegistroFamiglieComponent } from './components/registro-famiglie/registro-famiglie.component';
import { AuthGuard } from './secure/guard/auth-guard/auth.guard';

const routes: Routes = [ 
  { path: '', component: MenuComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'elenco-docenti', component: ElencoDocentiComponent },
      { path: 'elenco-classi', component: ElencoClassiComponent },
      { path: 'registro/registro-famiglie', component: RegistroFamiglieComponent, canActivate: [AuthGuard] },
      { path: 'registro/registro-docente', component: RegistroFamiglieComponent, canActivate: [AuthGuard] }
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
