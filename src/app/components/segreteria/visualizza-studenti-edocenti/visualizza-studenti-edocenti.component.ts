import { Component, OnInit, AfterContentInit } from '@angular/core';
import { SegreteriaService } from 'src/app/service/segreteria-service/service-dati/segreteria.service';

@Component({
  selector: 'app-visualizza-studenti-edocenti',
  templateUrl: './visualizza-studenti-edocenti.component.html',
  styleUrls: ['./visualizza-studenti-edocenti.component.css']
})
export class VisualizzaStudentiEDocentiComponent implements OnInit, AfterContentInit{
  loading: boolean;

  constructor(public segreteriaService: SegreteriaService){}

  ngOnInit(): void {
    this.findAllStudent();
    this.findAllDocenti();
  }

  ngAfterContentInit(): void {
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  private async findAllStudent(): Promise<void>{
    await this.segreteriaService.findAllStudent()
      .then(() => {})
      .catch(() => {})
  }

  private async findAllDocenti(): Promise<void>{
    await this.segreteriaService.findAllDocenti()
      .then(() => {})
      .catch(() => {})
  }

  deleteAlert(): void{
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  deleteStudent(userCode: string): void{
    this.segreteriaService.deleteStudent(userCode);
    setTimeout(() => {
      this.findAllStudent();
    }, 500)
  }

  deleteDocente(codiceFiscale: string): void{
    this.segreteriaService.deleteDocente(codiceFiscale);
    setTimeout(() => {
      this.findAllDocenti();
    }, 500)
  }
}
