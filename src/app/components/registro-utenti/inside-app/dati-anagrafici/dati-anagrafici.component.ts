import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Docente } from 'src/app/class/Docente';
import { Studente } from 'src/app/class/Studente';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';

@Component({
  selector: 'app-dati-anagrafici',
  templateUrl: './dati-anagrafici.component.html',
  styleUrls: ['./dati-anagrafici.component.css']
})
export class DatiAnagraficiComponent implements OnInit {

  routingUser_studenteOrDocente: boolean;

  formDocente: FormGroup;
  formStudente: FormGroup;

  private user: Studente | Docente;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
   this.gestioneRouting();
  }

  private gestioneRouting(): void{
    if(this.router.url.includes('registro-docente')){
      this.user = this.loginService.getDocente();
      this.routingUser_studenteOrDocente = true;
      this.formStudente = null;
      this.formDocente = this.createFormGroup();
      this.formDocente.addControl('codiceFiscale', new FormControl(this.user.codiceFiscale, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]));
      this.formDocente.addControl('materia', new FormControl(this.user.materia, [Validators.required]));
    }else{
      this.user = this.loginService.getStudente();
      this.routingUser_studenteOrDocente = false;
      this.formDocente = null;
      this.formStudente = this.createFormGroup();
      this.formStudente.addControl('userCode', new FormControl(this.user.userCode, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]));
      this.formStudente.addControl('sezione', new FormControl(this.user.sezione, [Validators.required, Validators.minLength(2), Validators.maxLength(3)]));
    }
  }

  private createFormGroup(): FormGroup{
    const formUser = new FormGroup({
      nome: new FormControl(this.user.nome, [Validators.required]),
      cognome: new FormControl(this.user.cognome, [Validators.required]),
      mail: new FormControl(this.user.mail, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(8)]), 
    });
    return formUser;
  }

  getUser(): Studente | Docente {
    return this.user;
  }

}
