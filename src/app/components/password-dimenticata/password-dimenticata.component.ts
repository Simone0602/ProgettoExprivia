import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';

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

  mobilePhone: boolean = false;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    public loginService: LoginService) { }

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!;
    this.token = this.route.snapshot.paramMap.get('token')!;

    if (this.token != null) {
      this.loginService.checkUser = '';
      this.loginService.message = '';
    }

    this.form = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(1)]),
      numberMobilePhone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
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
    if((!this.form.get('mail')!.valid || !this.form.get('userCode')!.valid) && !this.mobilePhone){
      return true;
    }else if(!this.form.get('userCode')!.valid && this.mobilePhone){
      return true;
    }
    return false;
  }

  sendEmail(): void {
    if (this.tipoUtente === 'studente') {
      this.mobilePhone ? 
        this.loginService.sendMessage(this.getStudente(), this.tipoUtente)
        : this.loginService.sendEmail(this.getStudente(), this.tipoUtente);
    }
  }

  reinvioEmail(): void{
    if(this.tipoUtente==='studente'){
      this.loginService.sendEmail(this.getStudente(), this.tipoUtente);
    }
  }

  resetPassword(): void {
    if (this.tipoUtente === 'studente') {
      this.loginService.updatePassword(this.form.value.password, this.token);
      setTimeout(() => {
        this.router.navigate(['login', this.tipoUtente]);
      }, 1000)
    }
  }

  private getStudente(): any{
    let studente = {};
    if(!this.mobilePhone){
      studente = {
        mail: this.form.value.mail,
        userCode: this.form.value.userCode
      }
    }else{
      studente = {
        number: this.form.value.numberMobilePhone,
        userCode: this.form.value.userCode
      }
    }
    return studente;
  }
}
