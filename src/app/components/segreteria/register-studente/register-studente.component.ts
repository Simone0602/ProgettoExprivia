import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaleService } from 'src/app/service/personale-ata-service/service-dati/personale.service';
import { SegreteriaService } from 'src/app/service/segreteria-service/service-dati/segreteria.service';

@Component({
  selector: 'app-register-studente',
  templateUrl: './register-studente.component.html',
  styleUrls: ['./register-studente.component.css'],
  animations: [
    trigger('selectNoSelect', [
      state('selected', style({
        height: 'max-content',
        opacity: 1
      })),
      state('noSelected', style({
        height: '0px',
        opacity: 0
      })),

      transition('selected => noSelected', [
        animate('0.5s ease-in')
      ]),
      transition('noSelected => selected', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class RegisterStudenteComponent implements OnInit, AfterContentInit{
  isVisible: boolean = false;
  showHideDiv: boolean = false;

  form: FormGroup;

  constructor(public personaleService: PersonaleService,
    public segreteriaService: SegreteriaService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      cognome: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      userCode: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      sezione: new FormControl('Selezionare una sezione', [Validators.required, Validators.minLength(2), Validators.maxLength(3)])
    });
    if(JSON.stringify(this.personaleService.getClassi()) == '[]'){
      this.personaleService.getListaClassi();
    }
  }

  ngAfterContentInit(): void {
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  isDivVisible(): void{
    if(!this.isVisible){
      this.showHideDiv = !this.showHideDiv;
      setTimeout(() => {
        this.isVisible = !this.isVisible;
      }, 10)
    }else{
      this.isVisible = !this.isVisible;
      setTimeout(() => {
        this.showHideDiv = !this.showHideDiv;
      }, 700)
    }
  }

  cambioSezione(sezione: string){
    this.form.get('sezione').setValue(sezione)
  }

  deleteAlert(): void{
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  save(): void{
    this.segreteriaService.saveStudente(this.form);
  }
}
