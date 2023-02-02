import { Component } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { ServiceDatiCalsseService } from 'src/app/service-ricevi-dati/classi/service-dati-classe.service';

@Component({
  selector: 'app-elenco-classi',
  templateUrl: './elenco-classi.component.html',
  styleUrls: ['./elenco-classi.component.css']
})
export class ElencoClassiComponent {

  constructor(public serviceClasse: ServiceDatiCalsseService){}

  ngOnInit(): void {
    this.getListaDocenti();
  }

  getListaDocenti(): void{
    const appoggio: Classe[] = [];
    if(JSON.stringify(this.serviceClasse.getClassi()) == JSON.stringify(appoggio)){
      this.serviceClasse.getListaClassi();
    }
  }
}
