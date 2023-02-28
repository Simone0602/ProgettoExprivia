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
  private assenze: Assenza[];
  private listAssenzeDaGiustificare: Assenza[] = [];

  constructor(private jwtService: JwtDecodeService, public registroService: RegistroService){}

  ngOnInit(): void {
    this.userCode = this.jwtService.getTokenDecode(JSON.parse(localStorage.getItem('token')).token).sub;
    this.listAssenzeDaGiustificare = [];
    this.callGetAssenze(this.userCode);
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
      .then(
        (res)=> {
          this.assenze = res;
        }
      )
      .catch(
        (rej) => {
          console.log(rej);
        }
      );
  }

  checkAssenza(position: number, isGiustificata: boolean): void{
    const assenza = this.assenze[position];
    assenza.giustificata = !isGiustificata;
    this.listAssenzeDaGiustificare.push(assenza);
  }

  giustifica(): void{
    this.registroService.giustificaAssenze(this.listAssenzeDaGiustificare, this.userCode);
    this.listAssenzeDaGiustificare = [];
  }

  getAssenze(): Assenza[]{
    return this.assenze;
  }
}
