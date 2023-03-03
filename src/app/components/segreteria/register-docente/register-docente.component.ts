import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SegreteriaService } from 'src/app/service/segreteria-service/service-dati/segreteria.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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

  dropdownList = [{}];
  dropdownSettings: IDropdownSettings;

  listMaterie: [
    {id: number, materia: string}
  ];

  constructor(public segreteriaService: SegreteriaService){
    this.dropdownList = [
      { id: 1, materia: 'matematica' },
      { id: 2, materia: 'storia' },
      { id: 3, materia: 'italiano' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      searchPlaceholderText: 'Cerca il nome di una materia',
      idField: 'id',
      textField: 'materia',
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

  deleteAlert(): void{
    this.segreteriaService.check = '';
    this.segreteriaService.message = '';
  }

  save(): void{
    this.form.addControl('materie', new FormControl(this.conversioneListMaterie()));
    this.segreteriaService.saveDocente(this.form);
  }

  private conversioneListMaterie(): string[]{
    let materie: string[] = [];
    for(let iter of this.listMaterie){
      console.log(iter.materia);
      materie.push(iter.materia)
    }
    return materie;
  }
}
