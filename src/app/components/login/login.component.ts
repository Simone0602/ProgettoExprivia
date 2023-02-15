import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceDatiDocenteService } from 'src/app/service/docente-service/service-dati/service-dati-docente.service';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';
import { ServiceDatiStudenteService } from 'src/app/service/studente-service/service-dati/service-dati-studente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  showHide: string = 'password';
  tipoUtente: string;

  formStudente: FormGroup;
  formDocente: FormGroup;
  
  constructor(private route: ActivatedRoute, 
    public loginService: LoginService){}

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!;
    this.loginService.checkUser = '';
    this.loginService.message = '';

    if(this.tipoUtente==='studente'){
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
    if(this.tipoUtente==='studente'){
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

  login(): void{
    if(this.tipoUtente=='studente'){
      const studente = {
        userCode: this.formStudente.value.userCode,
        password: this.formStudente.value.password
      }       
      this.loginService.loginStudente(studente);
    }else{
      const docente = {
        mail: this.formDocente.value.mail,
        codiceFiscale: this.formDocente.value.codiceFiscale,
        password: this.formDocente.value.password 
      }
      this.loginService.loginDocente(docente);
    }
  }
}
