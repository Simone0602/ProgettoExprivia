import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';

@Component({
  selector: 'app-password-dimenticata',
  templateUrl: './password-dimenticata.component.html',
  styleUrls: ['./password-dimenticata.component.css']
})
export class PasswordDimenticataComponent implements OnInit, AfterContentInit {
  isStudente: boolean;
  token: string;

  showHide: string = 'password';
  ugualianzaPassword: boolean;
  form: FormGroup;

  mobilePhone: boolean = false;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    public loginService: LoginService) { }

  ngOnInit(): void {
    this.isStudente = this.route.snapshot.paramMap.get('user')==='studente' ? true : false;
    this.token = this.route.snapshot.paramMap.get('token');

    this.form = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(1)]),
      numberMobilePhone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      userCode: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      codiceFiscale: new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  ngAfterContentInit(): void{
    if (this.token != null) {
      this.loginService.checkUser = '';
      this.loginService.message = '';
    }
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

  disabledButtonRecuperaPasswordStudente(): boolean{
    if((!this.form.get('mail').valid || !this.form.get('userCode').valid) && !this.mobilePhone){
      return true;
    }else if(!this.form.get('userCode').valid && this.mobilePhone){
      return true;
    }
    return false;
  }

  disabledButtonRecuperaPasswordDocente(): boolean{
    if((!this.form.get('mail').valid || !this.form.get('codiceFiscale').valid) && !this.mobilePhone){
      return true;
    }else if(!this.form.get('codiceFiscale')!.valid && this.mobilePhone){
      return true;
    }
    return false;
  }

  sendEmailStudente(): void {
    this.mobilePhone ? 
      this.loginService.sendMessageStudente(this.getStudente())
      : this.loginService.sendEmailStudente(this.getStudente());
  }

  sendEmailDocente(): void{
    this.mobilePhone?
      this.loginService.sendMessageDocente(this.getDocente())
      : this.loginService.sendEmailDocente(this.getDocente());
  }

  reinvioEmail(): void{
    if(this.isStudente){
      this.loginService.sendEmailStudente(this.getStudente());
    }else{
      this.loginService.sendEmailDocente(this.getDocente());
    }
  }

  resetPassword(tipoUser: string): void {
    this.loginService.updatePassword(this.form.value.password, this.token, tipoUser);
    setTimeout(() => {
      this.router.navigate(['login', tipoUser]);
    }, 1000)
  }

  private getStudente(): any{
    let studente = {};
    const mail = this.form.value.mail;
    const userCode = this.form.value.userCode;
    const number = this.form.value.numberMobilePhone;
    if(mail==null || mail=='' || userCode==null || userCode==''){
      return;
    }

    if(!this.mobilePhone){
      studente = {
        mail: mail,
        userCode: userCode
      }
    }else{
      studente = {
        number: number,
        userCode: userCode
      }
    }
    return studente;
  }

  private getDocente(): any{
    let docente = {};
    const mail = this.form.value.mail;
    const codiceFiscale = this.form.value.codiceFiscale;
    const number = this.form.value.numberMobilePhone;
    if(mail==null || mail=='' || codiceFiscale==null || codiceFiscale==''){
      return;
    }

    if(!this.mobilePhone){
      docente = {
        mail: mail,
        codiceFiscale: codiceFiscale
      }
    }else{
      docente = {
        number: number,
        codiceFiscale: codiceFiscale
      }
    }
    return docente;
  }
}
