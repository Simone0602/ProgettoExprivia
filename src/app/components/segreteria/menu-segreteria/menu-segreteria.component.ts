import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-segreteria',
  templateUrl: './menu-segreteria.component.html',
  styleUrls: ['./menu-segreteria.component.css']
})
export class MenuSegreteriaComponent {

  constructor(private router: Router){}

  isActive(routes: string[]): string {
    for (let route of routes) {
      if (this.router.url.includes(route)) {
        return 'active';
      }
    }
    return '';
  }

  logout(): void{
    this.router.navigate(['/home']);
  }
}
