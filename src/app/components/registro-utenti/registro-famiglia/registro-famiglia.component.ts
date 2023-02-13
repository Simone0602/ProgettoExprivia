import { Component, OnInit } from '@angular/core';
import { ServiceDatiStudenteService } from 'src/app/service/studente-service/service-dati/service-dati-studente.service';

@Component({
  selector: 'app-registro-famiglia',
  templateUrl: './registro-famiglia.component.html',
  styleUrls: ['./registro-famiglia.component.css']
})
export class RegistroFamigliaComponent implements OnInit{

  constructor(private studentService: ServiceDatiStudenteService){}

  ngOnInit(): void {
    this.studentService.registro();
  }

}
