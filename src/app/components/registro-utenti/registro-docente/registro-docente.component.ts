import { Component, OnInit, ViewChild } from '@angular/core';
import { Classe } from 'src/app/class/Classe';
import { ServiceDatiCalsseService } from 'src/app/service/classe-service/service-dati/service-dati-classe.service';
import { ServiceDatiDocenteService } from 'src/app/service/docente-service/service-dati/service-dati-docente.service';

@Component({
  selector: 'app-registro-docente',
  templateUrl: './registro-docente.component.html',
  styleUrls: ['./registro-docente.component.css']
})
export class RegistroDocenteComponent implements OnInit{

  constructor(){}

  ngOnInit(): void{
  }
}
