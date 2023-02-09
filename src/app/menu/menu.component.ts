import { AfterContentInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Classe } from '../class/Classe';
import { Docente } from '../class/Docente';
import { ServiceDatiCalsseService } from '../service-ricevi-dati/classi/service-dati-classe.service';
import { ServiceDatiDocenteService } from '../service-ricevi-dati/docente/service-dati-docente.service';
import { ServiceDatiStudenteService } from '../service-ricevi-dati/studente/service-dati-studente.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck{
  isDroppedClass: boolean;
  isDroppedDocente: boolean;
  active = 'Home';

  constructor(public serviceStudente: ServiceDatiStudenteService, public serviceClasse: ServiceDatiCalsseService, public serviceDocente: ServiceDatiDocenteService){}

  ngDoCheck(): void {
    if(this.isDroppedClass){
      setTimeout(() => {
        this.isDroppedClass=false;
      }, 3000)
    }
  }

  ngOnInit(): void {
  }

  navigazioneNavbar(value: string): void{
    this.active = value;
  }

  getListaClassi(): void{
    this.isDroppedClass = !this.isDroppedClass;
    
    const appoggio: Classe[] = [];
    if(JSON.stringify(this.serviceClasse.getClassi()) == JSON.stringify(appoggio)){
      this.serviceClasse.getListaClassi();
    }
  }

  getListaDocenti(): void{
    this.isDroppedDocente = !this.isDroppedDocente;

    const appoggio: Docente[] = [];
    if(JSON.stringify(this.serviceDocente.getDocenti()) == JSON.stringify(appoggio)){
      this.serviceDocente.getListaDocenti();
    }
  }
}


