import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { PersonaleService } from 'src/app/service/personale-ata-service/service-dati/personale.service';
import { SegreteriaService } from 'src/app/service/segreteria-service/service-dati/segreteria.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
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
export class UpdateComponent implements OnInit {
  isStudente: boolean;

  dropdownList: any = [{}];
  selectedList = [{}];
  dropdownSettings: IDropdownSettings;
  listMaterie: string[] = [];

  form: FormGroup;

  isVisible: boolean = false;
  showHideDiv: boolean = false;

  constructor(public activeModal: NgbActiveModal,
    private segreteriaService: SegreteriaService,
    public personaleService: PersonaleService,) {
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
    this.personaleService.getListaClassi();
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
      materie: new FormControl(null, [Validators.required])
    });
    docente.materie.forEach((materia) => this.listMaterie.push(materia.toLowerCase()));
    this.dropdownList.forEach((item) => {
      if (docente.materie.includes(item.text.toUpperCase())) {
        this.selectedList.push(item);
      }
    });
    this.selectedList.shift();
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

  updateStudente(): void {

  }

  updateDocente(): void{
    this.form.get('materie').setValue(this.listMaterie)
  }

  cancel(): void {
    this.activeModal.dismiss()
  }
}
