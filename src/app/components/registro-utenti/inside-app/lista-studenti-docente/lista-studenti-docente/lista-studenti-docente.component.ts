import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { JwtDecodeService } from 'src/app/service/jwt/jwt-decode.service';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';
import { RegistroService } from 'src/app/service/registro-service/service-dati/registro.service';

@Component({
  selector: 'app-lista-studenti-docente',
  templateUrl: './lista-studenti-docente.component.html',
  styleUrls: ['./lista-studenti-docente.component.css']
})
export class ListaStudentiDocenteComponent implements OnInit{
  classi: Classe[] = [];
  selezione : string = "Seleziona una classe";
  voto: number;

  constructor(public registroService: RegistroService,
    private jwtDecode: JwtDecodeService){}

  ngOnInit(): void{
    const token = JSON.parse(localStorage.getItem('token'));
    const token_decode = this.jwtDecode.getTokenDecode(token.token);
    this.registroService.getListaClassi(token_decode.sub);
  }

  onOptionChanged(event: Event){
    if(+(<HTMLInputElement>event.target).value!=0){
      this.registroService.getStudentiBySezione((<HTMLInputElement>event.target).value);
    }else{
      this.registroService.setStudenti([]);
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
