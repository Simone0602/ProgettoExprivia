import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceDatiStudenteService } from '../service-dati/studente/service-dati-studente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  showHide: string = 'password';
  tipoUtente: string;
  
  constructor(private route: ActivatedRoute, public serviceStudente: ServiceDatiStudenteService){}

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!;
    this.serviceStudente.checkUser = '';
    this.serviceStudente.message = '';
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

  login(form: NgForm): void{
    if(this.tipoUtente=='studente'){
      const studente = { 
        userCode: form.form.get('userCode')!.value,
        pas: form.form.get('password')!.value
      }
      this.serviceStudente.loginStudente(studente);
    }
  }
}
