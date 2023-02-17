import { Component, DoCheck, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { RegistroService } from 'src/app/service/registro-service/service-dati/registro.service';
import { Classe } from '../../class/Classe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck {

  constructor(public router: Router, 
    private registroService: RegistroService) { }

  ngDoCheck(): void { }

  ngOnInit(): void { }

  navigazioneNavbar(value: string): void {
    this.router.navigate([`${value}`, `registro-${value==='studente' ? 'famiglie' : value}`]).then((postNavigazione) => {
      if (!postNavigazione && postNavigazione != null) {
        let bool_1 = confirm('Devi registrati prima di accedere a questa sezione!');
        if (bool_1) {
          let bool_2 = confirm(`Sei ${value === 'studente' ? 'uno studente' : 'un docente'}?\nPremere 'ok' per confermare`);
          if (bool_2) {
            this.router.navigate([`login/${value}`])
          }
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

}


