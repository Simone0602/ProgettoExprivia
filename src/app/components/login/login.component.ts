import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit{
  showHide: string = 'password';
  isStudente: boolean;

  formStudente: FormGroup;
  formDocente: FormGroup;
  
  constructor(private route: ActivatedRoute, 
    public loginService: LoginService){}

  ngOnInit(): void {
    this.isStudente = this.route.snapshot.paramMap.get('user')=='studente' ? true : false;

    if(this.isStudente){
      this.formStudente = new FormGroup({
        userCode: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)])
      });
    }else{
      this.formDocente = new FormGroup({
        mail: new FormControl(null, [Validators.required, Validators.email]),
        codiceFiscale: new FormControl(null, Validators.required),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)])
      });
    }
  }

  ngAfterContentInit(): void {
    this.loginService.checkUser = '';
    this.loginService.message = '';
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

  validationPassword(): boolean{
    if(this.isStudente){
      if(this.formStudente.get('password')!.valid){
        return true;
      }
      return false;
    }else{
      if(this.formDocente.get('password')!.valid){
        return true;
      }
      return false;
    }
  }

  async loginStudente(): Promise<void>{
    const studente = {
      userCode: this.formStudente.value.userCode,
      password: this.formStudente.value.password
    }       
    await this.loginService.loginStudente(studente);
  }

  async loginDocente(): Promise<void>{
    const docente = {
      mail: this.formDocente.value.mail,
      codiceFiscale: this.formDocente.value.codiceFiscale,
      password: this.formDocente.value.password 
    }
    await this.loginService.loginDocente(docente);
  }
}
