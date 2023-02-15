import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { ServiceDatiCalsseService } from 'src/app/service/classe-service/service-dati/service-dati-classe.service';
import { ServiceDatiDocenteService } from 'src/app/service/docente-service/service-dati/service-dati-docente.service';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';

@Component({
  selector: 'app-lista-studenti-docente',
  templateUrl: './lista-studenti-docente.component.html',
  styleUrls: ['./lista-studenti-docente.component.css']
})
export class ListaStudentiDocenteComponent implements OnInit{
  classi: Classe[] = [];
  selezione : string = "Seleziona una classe";
  voto: number;

  constructor(public classService: ServiceDatiCalsseService, 
    public docenteService: ServiceDatiDocenteService,
    private loginService: LoginService){}

  ngOnInit(): void{
    this.docenteService.getListaClassi(this.loginService.getDocente().codiceFiscale);
  }

  onOptionChanged(event: Event){
    if(+(<HTMLInputElement>event.target).value!=0){
      this.classService.getStudentiBySezione((<HTMLInputElement>event.target).value);
    }else{
      this.classService.setStudenti([]);
    }
  }

  controlloVoto(event: Event){
    const voto = +(<HTMLInputElement>event.target).value;
    if(voto){
      if(voto>10){
        (<HTMLInputElement>event.target).value = "10";
      }
      if(voto<1){
        (<HTMLInputElement>event.target).value = "1";
      }
    }
  }
}
