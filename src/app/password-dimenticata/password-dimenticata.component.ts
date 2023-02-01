import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ugualianzaPassword: boolean;
  email: string;
  userCode: string;
  password: string;
  confPassword: string;

  notFoundEmail: boolean;

  constructor(private route: ActivatedRoute, private router: Router, public serviceStudente: ServiceDatiStudenteService){}

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!;
    this.token = this.route.snapshot.paramMap.get('token')!;

    if(this.token!=null){
      this.serviceStudente.checkUser = '';
      this.serviceStudente.message = '';
    }
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

  controlloUgualianzaPassword(): void{
    if(this.password == this.confPassword){
      this.ugualianzaPassword = true;
    }else{
      this.ugualianzaPassword = false;
    }
  }

  sendEmail(): void{
    if(this.tipoUtente === 'studente'){
      const studente = {
        mail: this.email,
        userCode: this.userCode
      }
      this.serviceStudente.sendEmail(studente, this.tipoUtente);
    }
  }

  resetPassword(): void{
    if(this.tipoUtente === 'studente'){
      this.serviceStudente.updatePassword(this.password, this.token);
      setTimeout(() => {
        this.router.navigate(['login', this.tipoUtente]);
      }, 1000)
    }
  }

  riceviToken(): void{ 
    if(this.tipoUtente === 'studente'){
      this.serviceStudente.getToken(this.userCode);
      setTimeout(() => {
        if(this.serviceStudente.newToken !== ''){
          this.router.navigate(['password-dimenticata', this.tipoUtente, this.serviceStudente.newToken]);
        }
      }, 1500)
    }
  }
}
