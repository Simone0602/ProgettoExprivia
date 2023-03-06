import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SegreteriaService } from 'src/app/service/segreteria-service/service-dati/segreteria.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-register-docente',
  templateUrl: './register-docente.component.html',
  styleUrls: ['./register-docente.component.css']
})
export class RegisterDocenteComponent {
  form: FormGroup;

  dropdownList = [{}];
  dropdownSettings: IDropdownSettings;

  listMaterie: string[] = [];

  constructor(public segreteriaService: SegreteriaService){
    this.dropdownList = [
      { id: 1, text: 'matematica' },
      { id: 2, text: 'storia' },
      { id: 3, text: 'italiano' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      searchPlaceholderText: 'Cerca il nome di una materia',
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
    this.getListaMaterie();
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

  onSelect(event: ListItem){
    this.listMaterie.push(event.text.toString())
  }

  onDeselect(event: ListItem){
    this.listMaterie = this.listMaterie.filter(materia => materia !== event.text.toString())
  }

  onSelectAll(event: ListItem[]){
    this.listMaterie = Array.from(new Set(event.map(item => item.text.toString())))
  }

  onDeselectAll(event: ListItem[]){
    this.listMaterie = Array.from(new Set(event.map(item => item.text.toString())))
  }

  save(): void{
    this.form.addControl('materie', new FormControl(this.listMaterie));
    this.segreteriaService.saveDocente(this.form);
  }
}
