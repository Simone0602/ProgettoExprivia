import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDatiStudenteService } from '../service-dati/studente/service-dati-studente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  showHide = 'password';
  tipoUtente = '';

  constructor(private router: Router, public serviceStudente: ServiceDatiStudenteService){}

  ngOnInit(): void {
    const position = this.router.url.lastIndexOf('-') + 1;
    this.tipoUtente = this.router.url.substring(position); 
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

}
