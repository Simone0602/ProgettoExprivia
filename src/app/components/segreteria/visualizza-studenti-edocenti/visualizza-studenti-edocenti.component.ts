import { Component, OnInit, AfterContentInit } from '@angular/core';
import { SegreteriaService } from 'src/app/service/segreteria-service/service-dati/segreteria.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Studente } from 'src/app/class/Studente';
import { Docente } from 'src/app/class/Docente';
import { UpdateStudenteComponent } from '../update-studente/update-studente.component';
import { UpdateDocenteComponent } from '../update-docente/update-docente.component';

@Component({
  selector: 'app-visualizza-studenti-edocenti',
  templateUrl: './visualizza-studenti-edocenti.component.html',
  styleUrls: ['./visualizza-studenti-edocenti.component.css']
})
export class VisualizzaStudentiEDocentiComponent implements OnInit, AfterContentInit{

  constructor(public segreteriaService: SegreteriaService, private modalService: NgbModal){}

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

  updateStudente(studente: Studente){
    this.segreteriaService.user = 'studente';
    this.segreteriaService.setStudente(studente);
    this.modalService.open(UpdateStudenteComponent);
  }

  updateDocente(docente: Docente){
    this.segreteriaService.user = 'docente';
    this.segreteriaService.setDocente(docente);
    this.modalService.open(UpdateDocenteComponent);
  }
}
