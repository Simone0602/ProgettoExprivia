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
    this.formStudente = this.createFormGroup()
    this.formDocente = this.createFormGroup()
    this.gestioneRoutin();
  }

  private createFormGroup(): FormGroup{
    const formUser = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      cognome: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    return formUser;
  }
  private gestioneRoutin(): void{
    if (this.router.url.includes('registro-docente')) {
      this.user = this.loginService.getDocente();
      this.routingUser_studenteOrDocente = true;
      this.formDocente.addControl('codiceFiscale', new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]))
    } else {
      this.user = this.loginService.getStudente();
      this.routingUser_studenteOrDocente = false;
    }
  }

  getUser(): Studente | Docente {
    return this.user;
  }

}
