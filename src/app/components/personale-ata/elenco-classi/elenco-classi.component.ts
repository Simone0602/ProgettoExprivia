import { Component } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { PersonaleService } from 'src/app/service/personale.service';

@Component({
  selector: 'app-elenco-classi',
  templateUrl: './elenco-classi.component.html',
  styleUrls: ['./elenco-classi.component.css']
})
export class ElencoClassiComponent {

  constructor(public serviceAta: PersonaleService){}

  ngOnInit(): void {
    this.getListaClassi();
  }

  getListaClassi(): void{
    const appoggio: Classe[] = [];
    if(JSON.stringify(this.serviceAta.getClassi()) == JSON.stringify(appoggio)){
      this.serviceAta.getListaClassi();
    }
  }
}
