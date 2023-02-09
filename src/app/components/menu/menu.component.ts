import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDatiCalsseService } from 'src/app/service/classe-service/service-dati/service-dati-classe.service';
import { ServiceDatiStudenteService } from 'src/app/service/studente-service/service-dati/service-dati-studente.service';
import { Classe } from '../../class/Classe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck {
  active: string = 'home';

  constructor(public serviceStudente: ServiceDatiStudenteService,
    public serviceClasse: ServiceDatiCalsseService,
    private router: Router) { }

  ngDoCheck(): void { }

  ngOnInit(): void { }

  navigazioneNavbar(value: string): void {
    if (value === 'famiglie' || value === 'docente') {
      this.router.navigate(['registro', `registro-${value}`]).then((postNavigazione) => {
        if (!postNavigazione && postNavigazione != null) {
          let bool_1 = confirm('Devi registrati prima di accedere a questa sezione!');
          if (bool_1) {
            let bool_2 = confirm(`Sei ${value === 'famiglie' ? 'uno studente' : 'un docente'}?\nPremere 'ok' per confermare`);
            if (bool_2) {
              value === 'famiglie' ? this.router.navigate(['login/studente']) : this.router.navigate(['login/docente']);
            }
          }
        } else {
          this.active = value;
        }
      });
    } else {
      this.active = value;
    }
  }

  getListaClassi(): void {
    const appoggio: Classe[] = [];
    if (JSON.stringify(this.serviceClasse.getClassi()) == JSON.stringify(appoggio)) {
      this.serviceClasse.getListaClassi();
    }
  }
}


