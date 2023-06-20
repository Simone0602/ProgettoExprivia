import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings, ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { Docente } from 'src/app/class/Docente';
import { PersonaleService } from 'src/app/service/personale.service';
import { SegreteriaService } from 'src/app/service/segreteria.service';

@Component({
  selector: 'app-update-docente',
  templateUrl: './update-docente.component.html',
  styleUrls: ['./update-docente.component.css']
})
export class UpdateDocenteComponent implements OnInit{

  dropdownListMaterie: any = [{}];
  dropdownSettingsMaterie: IDropdownSettings;
  selectedListMaterie = [{}];
  listMaterie: string[] = [];

  dropdownListClassi: any = [{}];
  dropdownSettingsClassi: IDropdownSettings;
  selectedListClassi = [{}];
  listClassi: string[] = [];

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    public segreteriaService: SegreteriaService,
    public personaleService: PersonaleService) {
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
      { id: 5, text: '5c' },
    ]
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
      searchPlaceholderText: 'Cerca la sezione della classe',
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    this.settingFormDocente();
  }

  ngAfterContentInit(): void {
    this.segreteriaService.checkUpdate = '';
    this.segreteriaService.messageUpdate = '';
  }

  settingFormDocente(): void {
    const docente = this.segreteriaService.getDocente();
    this.form = new FormGroup({
      nome: new FormControl(docente.nome, [Validators.required]),
      cognome: new FormControl(docente.cognome, [Validators.required]),
      mail: new FormControl(docente.mail, [Validators.required, Validators.email]),
      password: new FormControl('****************', [Validators.required, Validators.minLength(8)]),
      codiceFiscale: new FormControl(docente.codiceFiscale, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      materie: new FormControl(null, [Validators.required]),
      sezioni: new FormControl(null, [Validators.required])
    });
    this.settingVariablesMaterie(docente);
    this.settingVariablesClassi(docente);
  }

  private settingVariablesMaterie(docente: Docente): void{
    docente.materie.forEach((materia) => this.listMaterie.push(materia.toLowerCase()));
    this.dropdownListMaterie.forEach((item) => {
      if (docente.materie.includes(item.text.toUpperCase())) {
        this.selectedListMaterie.push(item);
      }
    });
    this.selectedListMaterie.shift();
  }

  private settingVariablesClassi(docente: Docente): void{
    docente.sezioni.forEach((sezione) => this.listClassi.push(sezione));
    this.dropdownListClassi.forEach((item) => {
      if (docente.sezioni.includes(item.text)) {
        this.selectedListClassi.push(item);
      }
    });
    this.selectedListClassi.shift();
  }

  deleteAlert(): void {
    this.segreteriaService.checkUpdate = '';
    this.segreteriaService.messageUpdate = '';
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
    this.listClassi = this.listClassi.filter(sezione => sezione !== event.text.toString())
  }

  onSelectAllClassi(event: ListItem[]){
    this.listClassi = Array.from(new Set(event.map(item => item.text.toString())))
  }

  onDeselectAllClassi(event: ListItem[]){
    this.listClassi = Array.from(new Set(event.map(item => item.text.toString())))
  }

  updateDocente(): void{
    this.form.get('materie').setValue(this.listMaterie);
    this.form.get('sezioni').setValue(this.listClassi);
    this.segreteriaService.updateDocente(this.form.value);
  }

  cancel(): void {
    this.activeModal.dismiss()
  }
}
