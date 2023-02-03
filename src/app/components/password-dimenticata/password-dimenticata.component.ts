import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDatiStudenteService } from 'src/app/service/studente-service/service-dati/service-dati-studente.service';

@Component({
  selector: 'app-password-dimenticata',
  templateUrl: './password-dimenticata.component.html',
  styleUrls: ['./password-dimenticata.component.css']
})
export class PasswordDimenticataComponent implements OnInit {
  tipoUtente: string;
  token: string;

  showHide: string = 'password';
  ugualianzaPassword: boolean;
  form: FormGroup;

  notFoundEmail: boolean;

  constructor(private route: ActivatedRoute, private router: Router, public serviceStudente: ServiceDatiStudenteService) { }

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!;
    this.token = this.route.snapshot.paramMap.get('token')!;

    if (this.token != null) {
      this.serviceStudente.checkUser = '';
      this.serviceStudente.message = '';
    }

    this.form = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(1)]),
      userCode: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  showHidePassword(): void {
    switch (this.showHide) {
      case 'password':
        this.showHide = 'text';
        break;
      case 'text':
        this.showHide = 'password';
        break;
    }
  }

  controlloUgualianzaPassword(): void {
    if (this.form.value.password === this.form.value.confPassword) {
      if(this.form.value.password==='' || this.form.value.confPassword===''){
        this.ugualianzaPassword = false;
      }else{
        this.ugualianzaPassword = true;
      }
    } else {
      this.ugualianzaPassword = false;
    }
  }

  disabledButtonRecuperaPassword(): boolean{
    if((!this.form.get('mail')!.valid || !this.form.get('userCode')!.valid) && !this.notFoundEmail){
      return true;
    }else if(!this.form.get('userCode')!.valid && this.notFoundEmail){
      return true;
    }
    return false;
  }

  sendEmail(): void {
    if (this.tipoUtente === 'studente') {
      const studente = {
        mail: this.form.value.mail,
        userCode: this.form.value.userCode
      }
      this.serviceStudente.sendEmail(studente, this.tipoUtente);
    }
  }

  resetPassword(): void {
    if (this.tipoUtente === 'studente') {
      this.serviceStudente.updatePassword(this.form.value.password, this.token);
      setTimeout(() => {
        this.router.navigate(['login', this.tipoUtente]);
      }, 1000)
    }
  }

  riceviToken(): void {
    if (this.tipoUtente === 'studente') {
      this.serviceStudente.getToken(this.form.value.userCode);
      setTimeout(() => {
        if (this.serviceStudente.newToken !== '') {
          this.router.navigate(['password-dimenticata', this.tipoUtente, this.serviceStudente.newToken]);
        }
      }, 1500)
    }
  }
}
