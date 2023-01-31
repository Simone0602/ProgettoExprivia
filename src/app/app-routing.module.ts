import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PasswordDimenticataComponent } from './password-dimenticata/password-dimenticata.component';

const routes: Routes = [ 
  { path: '', component: MenuComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
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
