import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SegreteriaService } from 'src/app/service/segreteria.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-register-docente',
  templateUrl: './register-docente.component.html',
  styleUrls: ['./register-docente.component.css']
})
export class RegisterDocenteComponent {
  form: FormGroup;

  dropdownListMaterie = [{}];
  dropdownSettingsMaterie: IDropdownSettings;

  dropdownListClassi = [{}];
  dropdownSettingsClassi: IDropdownSettings;

  listMaterie: string[] = [];
  listClassi: string[] = [];

  constructor(public segreteriaService: SegreteriaService){
    this.dropdownListMaterie = [
      { id: 1, text: 'matematica' },
      { id: 2, text: 'storia' },
      { id: 3, text: 'italiano' }
    ];
    this.dropdownListClassi = [
      { id: 1, text: '1c' },
      { id: 2, text: '2c' },
      { id: 3, text: '3c' },
      { id: 4, text: '4c' },
      { id: 5, text: '5c' }
    ];
    this.dropdownSettingsMaterie = {
      singleSelection: false,
      searchPlaceholderText: 'Cerca il nome di una materia',
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.dropdownSettingsClassi = {
      singleSelection: false,
      searchPlaceholderText: 'Cerca la sezione',
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      cognome: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      codiceFiscale: new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(16)])
    });
    if(JSON.stringify(this.segreteriaService.getMaterie()) == '[]'){
      this.getListaMaterie();
    }
  }

  ngAfterContentInit(): void {
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  async getListaMaterie(): Promise<void>{
    await this.segreteriaService.findAllMaterie();
  }

  deleteAlert(): void{
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  onSelectMaterie(event: ListItem){
    this.listMaterie.push(event.text.toString())
  }

  onDeselectMaterie(event: ListItem){
    this.listMaterie = this.listMaterie.filter(materia => materia !== event.text.toString())
  }

  onSelectAllMaterie(event: ListItem[]){
    this.listMaterie = Array.from(new Set(event.map(item => item.text.toString())))
  }

  onDeselectAllMaterie(event: ListItem[]){
    this.listMaterie = Array.from(new Set(event.map(item => item.text.toString())))
  }

  onSelectClassi(event: ListItem){
    this.listClassi.push(event.text.toString())
  }

  onDeselectClassi(event: ListItem){
    this.listClassi = this.listClassi.filter(materia => materia !== event.text.toString())
  }

  onSelectAllClassi(event: ListItem[]){
    this.listClassi = Array.from(new Set(event.map(item => item.text.toString())))
  }

  onDeselectAllClassi(event: ListItem[]){
    this.listClassi = Array.from(new Set(event.map(item => item.text.toString())))
  }

  save(): void{
    this.form.addControl('materie', new FormControl(this.listMaterie));
    this.form.addControl('sezioni', new FormControl(this.listClassi));
    this.segreteriaService.saveDocente(this.form.value);
  }
}
