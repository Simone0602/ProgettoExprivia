import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  notFoundEmail: boolean;

  constructor(private route: ActivatedRoute, private router: Router, public serviceStudente: ServiceDatiStudenteService){}

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!;
    this.token = this.route.snapshot.paramMap.get('token')!;

    if(this.token!=null){
      this.serviceStudente.checkUser = '';
      this.serviceStudente.message = '';
    }
    
    var inclusione = /^(?=.[A-Z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi;

    this.form = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(1)]), 
      userCode: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(inclusione)]),
      confPassword: new FormControl()
    })

    console.log(this.form.get('password')!.valid)
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
    if(this.form.get('password')!.value==this.form.get('confPassword')!.value){
      this.ugualianzaPassword = true;
    }else{
      this.ugualianzaPassword = false;
    }
    console.log(this.form.get('password')!.valid)
  }

  sendEmail(): void{
    if(this.tipoUtente === 'studente'){
      const studente = {
        mail: this.form.get('mail')!.value,
        userCode: this.form.get('userCode')!.value
      }
      this.serviceStudente.sendEmail(studente, this.tipoUtente);
    }
  }

  resetPassword(): void{
    if(this.tipoUtente === 'studente'){
      this.serviceStudente.updatePassword(this.form.get('password')!.value, this.token);
      setTimeout(() => {
        this.router.navigate(['login', this.tipoUtente]);
      }, 1000)
    }
  }

  riceviToken(): void{ 
    if(this.tipoUtente === 'studente'){
      this.serviceStudente.getToken(this.form.get('userCode')!.value);
      setTimeout(() => {
        if(this.serviceStudente.newToken !== ''){
          this.router.navigate(['password-dimenticata', this.tipoUtente, this.serviceStudente.newToken]);
        }
      }, 1500)
    }
  }
}
