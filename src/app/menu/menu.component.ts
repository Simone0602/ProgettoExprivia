import { AfterContentInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceDatiStudenteService } from '../service-dati/studente/service-dati-studente.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck{
  isDropped: boolean;
  active = 'Home';

  constructor(public serviceStudente: ServiceDatiStudenteService){}

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
  }
}


