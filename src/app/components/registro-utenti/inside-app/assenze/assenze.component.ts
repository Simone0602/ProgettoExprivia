import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Assenza } from 'src/app/class/Assenza';
import { JwtDecodeService } from 'src/app/service/jwt/jwt-decode.service';
import { RegistroService } from 'src/app/service/registro-service/service-dati/registro.service';

@Component({
  selector: 'app-assenze',
  templateUrl: './assenze.component.html',
  styleUrls: ['./assenze.component.css']
})
export class AssenzeComponent implements OnInit, AfterContentInit{
  private userCode: string;
  private listAssenzeDaGiustificare: Assenza[] = [];

  constructor(private jwtService: JwtDecodeService, public registroService: RegistroService){}

  ngOnInit(): void {
    this.registroService.loading = true;
    this.userCode = this.jwtService.getTokenDecode(JSON.parse(localStorage.getItem('token')).token).sub;
    this.listAssenzeDaGiustificare = [];
    this.callGetAssenze(this.userCode);
    setTimeout(() => {
      this.registroService.loading = false;
    }, 500);
  }

  ngAfterContentInit(): void {
    this.registroService.check = '';
    this.registroService.message = '';
  }

  disabled(assenza: Assenza): boolean{
    if(assenza.giustificata && !this.listAssenzeDaGiustificare.includes(assenza)){
      return true;
    }
    return false;
  }

  private async callGetAssenze(userCode: string): Promise<void>{
    await this.registroService.callGetAssenze(userCode)
      .then(()=> {})
      .catch(() => {});
  }

  checkAssenza(position: number, isGiustificata: boolean): void{
    const assenza = this.registroService.getAssenze()[position];
    assenza.giustificata = !isGiustificata;
    this.listAssenzeDaGiustificare.push(assenza);
  }

  giustifica(): void{
    this.registroService.giustificaAssenze(this.listAssenzeDaGiustificare, this.userCode);
    this.listAssenzeDaGiustificare = [];
  }

  deleteAlert(): void{
    this.registroService.check = '';
    this.registroService.message = '';
  }
}
