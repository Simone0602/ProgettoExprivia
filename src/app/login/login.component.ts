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

  showHide = 'password';
  tipoUtente: string;



  constructor(private route: ActivatedRoute , public serviceStudente: ServiceDatiStudenteService){}

  ngOnInit(): void {
    this.tipoUtente = this.route.snapshot.paramMap.get('user')!; 
    console.log(this.tipoUtente);
    
  }

  login(form: NgForm):void{
    if(this.tipoUtente == "studente" ){
      const studente = {
        userCode: form.form.get("userCode")!.value,
        pass: form.form.get("password")!.value
      }

      this.serviceStudente.login(studente);
    }else{
      
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

}
