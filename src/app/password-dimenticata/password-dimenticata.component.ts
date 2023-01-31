import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDatiStudenteService } from '../service-dati/studente/service-dati-studente.service';

@Component({
  selector: 'app-password-dimenticata',
  templateUrl: './password-dimenticata.component.html',
  styleUrls: ['./password-dimenticata.component.css']
})
export class PasswordDimenticataComponent implements OnInit{
  tipoUtente: string;
  token: string;

  showHide: string = 'password';
  email: string;
  userCode: string;

  notFoundEmail: boolean;

  constructor(private route: ActivatedRoute, public serviceStudente: ServiceDatiStudenteService){}

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  showHidePassword(): void{
    switch(this.showHide){
      case 'password':
        this.showHide = 'text';
        break;
      case 'text':
        this.showHide = 'password';
        break;
    }
  }

  sendEmail(): void{
    if(this.tipoUtente == 'studente'){
      const studente = {
        mail: this.email,
        userCode: this.userCode
      }
      
      this.serviceStudente.resetPassword(studente, this.tipoUtente);
    }
  }
}
