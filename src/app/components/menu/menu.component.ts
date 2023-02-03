import { Component, DoCheck, OnInit } from '@angular/core';
import { ServiceDatiCalsseService } from 'src/app/service/classe-service/service-dati/service-dati-classe.service';
import { ServiceDatiStudenteService } from 'src/app/service/studente-service/service-dati/service-dati-studente.service';
import { Classe } from '../../class/Classe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck{
  active = 'Home';

  constructor(public serviceStudente: ServiceDatiStudenteService, public serviceClasse: ServiceDatiCalsseService){}

  ngDoCheck(): void {}

  ngOnInit(): void {}

  navigazioneNavbar(value: string): void{
    this.active = value;
  }

  getListaClassi(): void{
    const appoggio: Classe[] = [];
    if(JSON.stringify(this.serviceClasse.getClassi()) == JSON.stringify(appoggio)){
      this.serviceClasse.getListaClassi();
    }
  }
}


