import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { Studente } from 'src/app/class/Studente';
import { PersonaleService } from 'src/app/service/personale.service';
import { SegreteriaService } from 'src/app/service/segreteria.service';

@Component({
  selector: 'app-update-studente',
  templateUrl: './update-studente.component.html',
  styleUrls: ['./update-studente.component.css']
})
export class UpdateStudenteComponent implements OnInit, AfterContentInit{
  dropdownList: any = [{}];
  selectedSezione: any = [{}];
  dropdownSettings: IDropdownSettings;
  sezione: string;

  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    public segreteriaService: SegreteriaService,
    public personaleService: PersonaleService,) {
    this.dropdownList = [
      { id: 1, text: '1c' },
      { id: 2, text: '2c' },
      { id: 3, text: '3c' },
      { id: 4, text: '4c' },
      { id: 5, text: '5c' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      searchPlaceholderText: 'Cerca sezione della classe',
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  ngOnInit(): void {
    this.settingFormStudente();
  }

  ngAfterContentInit(): void {
    this.segreteriaService.checkUpdate = '';
    this.segreteriaService.messageUpdate = '';
  }

  settingFormStudente(): void {
    this.personaleService.getListaClassi();
    const studente = this.segreteriaService.getStudente();
    this.form = new FormGroup({
      nome: new FormControl(studente.nome, [Validators.required]),
      cognome: new FormControl(studente.cognome, [Validators.required]),
      mail: new FormControl(studente.mail, [Validators.required, Validators.email]),
      password: new FormControl('****************', [Validators.required, Validators.minLength(8)]),
      userCode: new FormControl(studente.userCode, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      sezione: new FormControl(studente.sezione, [Validators.required, Validators.minLength(2), Validators.maxLength(3)])
    });
    this.settingVariablesSezione(studente);
  }

  private settingVariablesSezione(studente: Studente){
    this.sezione = studente.sezione;
    this.dropdownList.forEach((item) => {
      if (studente.sezione == item.text) {
        this.selectedSezione.push(item);
      }
    });
    this.selectedSezione.shift();
  }

  deleteAlert(): void {
    this.segreteriaService.checkUpdate = '';
    this.segreteriaService.messageUpdate = '';
  }

  onSelect(event: ListItem){
    this.sezione = event.text.toString()
  }

  onDeselect(event: ListItem){
    this.sezione = '';
  }

  updateStudente(): void {
    this.segreteriaService.updateStudente(this.form.value);
  }

  cancel(): void {
    this.activeModal.dismiss()
  }
}
