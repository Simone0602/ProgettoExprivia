import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceDatiStudenteService } from '../../service-ricevi-dati/studente/service-dati-studente.service';

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
  
  constructor(private route: ActivatedRoute, public serviceStudente: ServiceDatiStudenteService){}

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!;
    this.serviceStudente.checkUser = '';
    this.serviceStudente.message = '';

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
      this.serviceStudente.loginStudente(studente);
    }
  }
}
