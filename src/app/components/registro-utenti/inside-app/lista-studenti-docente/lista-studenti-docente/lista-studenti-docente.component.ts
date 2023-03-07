import { Component, OnInit } from '@angular/core';
import { JwtDecodeService } from 'src/app/service/jwt/jwt-decode.service';
import { RegistroService } from 'src/app/service/registro-service/service-dati/registro.service';

@Component({
  selector: 'app-lista-studenti-docente',
  templateUrl: './lista-studenti-docente.component.html',
  styleUrls: ['./lista-studenti-docente.component.css']
})
export class ListaStudentiDocenteComponent implements OnInit{
  isTableVisible: boolean = false;

  constructor(public registroService: RegistroService,
    private jwtDecode: JwtDecodeService){}

  ngOnInit(): void{
    this.registroService.loading = true;
    const token = JSON.parse(localStorage.getItem('token'));
    const token_decode = this.jwtDecode.getTokenDecode(token.token);
    if(JSON.stringify(this.registroService.getClassi()) == '[]'){
      this.registroService.getListaClassi(token_decode.sub);
    }
    setTimeout(() => {
      this.registroService.loading = false;
    }, 500)
  }

  onOptionChanged(event: Event){
    if(+(<HTMLInputElement>event.target).value!=0){
      this.isTableVisible = true;
      this.registroService.getStudentiBySezione((<HTMLInputElement>event.target).value);
    }else{
      this.isTableVisible = false;
      this.registroService.setStudenti([]);
    }
  }

  controlloVoto(event: Event){
    const input = (<HTMLInputElement>event.target).value;
    if(input!=''){
      const voto = parseInt(input);
      if(voto>10){
        (<HTMLInputElement>event.target).value = '10';
      }else if(voto<1){
        (<HTMLInputElement>event.target).value = '1';
      }
    }else{
      (<HTMLInputElement>event.target).value = '';
    }
  }
}
