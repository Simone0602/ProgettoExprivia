import { AfterContentInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Classe } from '../classi/Classe';
import { ServiceDatiCalsseService } from '../service-ricevi-dati/classi/service-dati-classe.service';
import { ServiceDatiStudenteService } from '../service-ricevi-dati/studente/service-dati-studente.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck{
  isDropped: boolean;
  active = 'Home';

  constructor(public serviceStudente: ServiceDatiStudenteService, public serviceClasse: ServiceDatiCalsseService){}

  ngDoCheck(): void {
    if(this.isDropped){
      setTimeout(() => {
        this.isDropped=false;
      }, 3000)
    }
  }

  ngOnInit(): void {
  }

  navigazioneNavbar(value: string): void{
    this.active = value;
  }

  getListaClassi(): void{
    this.isDropped = !this.isDropped;
    
    const appoggio: Classe[] = [];
    if(JSON.stringify(this.serviceClasse.getClassi()) == JSON.stringify(appoggio)){
      this.serviceClasse.getListaClassi();
    }
  }
}


