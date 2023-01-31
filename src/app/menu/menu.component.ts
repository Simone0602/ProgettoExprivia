import { Component, OnInit } from '@angular/core';
import { ServiceDatiStudenteService } from '../service-dati/studente/service-dati-studente.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  active = 'Home';

  constructor(public serviceStudente: ServiceDatiStudenteService){}

  ngOnInit(): void {
  }

  navigazioneNavbar(value: string): void{
    this.active = value;
  }

  getListaClassi(): void{
    
  }
}

