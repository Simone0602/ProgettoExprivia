import { Component, OnInit } from '@angular/core';
import { JwtDecodeService } from 'src/app/service/jwt/jwt-decode.service';
import { RegistroService } from 'src/app/service/registro-service/service-dati/registro.service';

@Component({
  selector: 'app-voti',
  templateUrl: './voti.component.html',
  styleUrls: ['./voti.component.css']
})
export class VotiComponent implements OnInit {
  private userCode: string;

  constructor(private jwtService: JwtDecodeService, 
    public registroService: RegistroService){}

  ngOnInit(): void {
    this.registroService.loading = true;
    this.userCode = this.jwtService.getTokenDecode(JSON.parse(localStorage.getItem('token')).token).sub;
    this.callGetRegistro();
    setTimeout(() => {
      this.registroService.loading = false;
    }, 500)
  }

  private async callGetRegistro(): Promise<void>{
    await this.registroService.callGetRegistro(this.userCode)
      .then(() => {})
      .catch(() => {})
  }

  registroStudente(): string[]{
    const materie: string[] = [];

    for (const iterator of this.registroService.getRegistro().listaVoti) {
      let nome_materia: string = iterator.materia.toLowerCase()
      if(!materie.includes(nome_materia)){
        materie.push(nome_materia)
      }
    }
    return materie;
  }
}
