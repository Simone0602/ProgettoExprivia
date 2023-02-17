import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/class/Docente';
import { PersonaleService } from 'src/app/service/personale-ata-service/service-dati/personale.service';

@Component({
  selector: 'app-elenco-docenti',
  templateUrl: './elenco-docenti.component.html',
  styleUrls: ['./elenco-docenti.component.css']
})
export class ElencoDocentiComponent implements OnInit {

  constructor(public serviceAta: PersonaleService){}

  ngOnInit(): void {
    this.getListaDocenti();
  }

  getListaDocenti(): void{
    const appoggio: Docente[] = [];
    if(JSON.stringify(this.serviceAta.getDocenti()) == JSON.stringify(appoggio)){
      this.serviceAta.getListaDocenti();
    }
  }
}