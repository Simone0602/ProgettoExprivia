import { Component, OnInit, DoCheck } from '@angular/core';
import { Router} from '@angular/router';
import { Response } from 'src/app/class/Response';
import { AuthService } from 'src/app/secure/auth-service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  role: string = '';
  token: Response;

  constructor(public router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('token'));
    if(this.token==null){
      this.role = '';
    }else{
      this.role = this.token.utenza;
    }
  }

  navigazioneNavbar(value: string): void {
    this.router.navigate([`${value}`, 'registro', `registro-${value==='studente' ? 'famiglie' : value}`])
    .then((postNavigazione) => {
      if (!postNavigazione && postNavigazione != null) {
        let bool_1 = confirm('Devi registrati prima di accedere a questa sezione!');
        if (bool_1) {
          this.router.navigate([`login/${value}`])
        }
      }
    })
  }

  isActive(routes: string[]): string {
    for (let route of routes) {
      if (this.router.url.includes(route)) {
        return 'active';
      }
    }
    return '';
  }

  logout(): void{
    localStorage.removeItem('token');
    this.role='';
    this.router.navigate(['/home']);
  }
}


