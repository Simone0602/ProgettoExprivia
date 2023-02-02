import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/class/Docente';
import { ServiceDatiDocenteService } from 'src/app/service-ricevi-dati/docente/service-dati-docente.service';

@Component({
  selector: 'app-elenco-docenti',
  templateUrl: './elenco-docenti.component.html',
  styleUrls: ['./elenco-docenti.component.css']
})
export class ElencoDocentiComponent implements OnInit {

  constructor(public serviceDocente: ServiceDatiDocenteService){}

  ngOnInit(): void {
    this.getListaDocenti();
  }

  getListaDocenti(): void{
    const appoggio: Docente[] = [];
    if(JSON.stringify(this.serviceDocente.getDocenti()) == JSON.stringify(appoggio)){
      this.serviceDocente.getListaDocenti();
    }
  }
}