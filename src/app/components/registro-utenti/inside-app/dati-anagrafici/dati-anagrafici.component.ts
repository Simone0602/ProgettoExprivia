import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from 'src/app/class/Docente';
import { Studente } from 'src/app/class/Studente';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';

@Component({
  selector: 'app-dati-anagrafici',
  templateUrl: './dati-anagrafici.component.html',
  styleUrls: ['./dati-anagrafici.component.css']
})
export class DatiAnagraficiComponent implements OnInit{
  
  private user: Studente | Docente;

  constructor(private loginService: LoginService,
    private router: Router){}

  ngOnInit(): void { 
    if(this.router.url.includes('registro-docente')){
      this.user = this.loginService.getDocente();
    }else{
      this.user = this.loginService.getStudente();
    }
    console.log(this.user);
    
  }

}
