import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { ServiceDatiCalsseService } from 'src/app/service/classe-service/service-dati/service-dati-classe.service';
import { ServiceDatiStudenteService } from 'src/app/service/studente-service/service-dati/service-dati-studente.service';
import { Classe } from '../../class/Classe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck {

  constructor(public serviceStudente: ServiceDatiStudenteService,
    public serviceClasse: ServiceDatiCalsseService,
    public router: Router) { }

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

  getListaClassi(): void {
    const appoggio: Classe[] = [];
    if (JSON.stringify(this.serviceClasse.getClassi()) == JSON.stringify(appoggio)) {
      this.serviceClasse.getListaClassi();
    }
  }
}


