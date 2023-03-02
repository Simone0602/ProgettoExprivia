import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SegreteriaService } from 'src/app/service/segreteria-service/service-dati/segreteria.service';

@Component({
  selector: 'app-register-docente',
  templateUrl: './register-docente.component.html',
  styleUrls: ['./register-docente.component.css'],
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
export class RegisterDocenteComponent {
  isVisible: boolean = false;
  showHideDiv: boolean = false;

  form: FormGroup;

  private listMaterie: string[] = [];

  constructor(public segreteriaService: SegreteriaService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      cognome: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      codiceFiscale: new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      materie: new FormControl('Selezionare una o più materie', [Validators.required])
    });
    this.getListaMaterie();
  }

  ngAfterContentInit(): void {
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  async getListaMaterie(): Promise<void>{
    await this.segreteriaService.findAllMaterie();
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

  cambioMateria(materia: string){
    if(this.form.value.materie=='Selezionare una o più materie'){
      this.form.value.materie = '';
      this.form.get('materie').setValue(materia)
    }else{
      if(!this.form.value.materie.includes(materia)){
        this.form.get('materie').setValue(this.form.value.materie + ', ' + materia)
      }
    }
    this.listMaterie.push(materia);
  }

  deleteAlert(): void{
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  save(): void{
    this.form.value.materie = this.listMaterie;
    this.segreteriaService.saveDocente(this.form);
  }
}
