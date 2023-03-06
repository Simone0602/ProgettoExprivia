import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { SegreteriaService } from 'src/app/service/segreteria-service/service-dati/segreteria.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  isStudente: boolean;

  dropdownList = [{}];
  selectedList = [{}];
  dropdownSettings: IDropdownSettings;
  listMaterie: string[] = [];

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private segreteriaService: SegreteriaService) {
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
    this.isStudente = this.segreteriaService.user == 'studente' ? true : false;
    this.isStudente ? this.settingFormStudente() : this.settingFormDocente();
  }

  settingFormStudente(): void {
    const studente = this.segreteriaService.getStudente();
    this.form = new FormGroup({
      nome: new FormControl(studente.nome, [Validators.required]),
      cognome: new FormControl(studente.cognome, [Validators.required]),
      mail: new FormControl(studente.mail, [Validators.required, Validators.email]),
      password: new FormControl(studente.password, [Validators.required, Validators.minLength(8)]),
      userCode: new FormControl(studente.userCode, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      sezione: new FormControl(studente.sezione, [Validators.required, Validators.minLength(2), Validators.maxLength(3)])
    });
  }

  settingFormDocente(): void {
    const docente = this.segreteriaService.getDocente();
    this.form = new FormGroup({
      nome: new FormControl(docente.nome, [Validators.required]),
      cognome: new FormControl(docente.cognome, [Validators.required]),
      mail: new FormControl(docente.mail, [Validators.required, Validators.email]),
      password: new FormControl(docente.password, [Validators.required, Validators.minLength(8)]),
      codiceFiscale: new FormControl(docente.codiceFiscale, [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    });
    this.selectedList = docente.materie
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

  update(): void {

  }

  cancel(): void {
    this.activeModal.dismiss()
  }
}
