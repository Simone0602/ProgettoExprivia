import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/class/Response';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';
import { RegistroService } from 'src/app/service/registro-service/service-dati/registro.service';
import { JwtDecodeService } from 'src/app/service/jwt/jwt-decode.service';

@Component({
  selector: 'app-dati-anagrafici',
  templateUrl: './dati-anagrafici.component.html',
  styleUrls: ['./dati-anagrafici.component.css']
})
export class DatiAnagraficiComponent implements OnInit, AfterContentInit {
  isStudente: boolean;
  update: boolean = false;

  formDocente: FormGroup;
  formStudente: FormGroup;

  private token: Response;
  private token_decode: { sub: string, exp: Date, iat: Date };

  constructor(private loginService: LoginService,
    public registroService: RegistroService,
    private jwtDecode: JwtDecodeService) { }

  ngOnInit(): void {
    this.registroService.loading = true;
    this.token = JSON.parse(localStorage.getItem("token"));
    this.isStudente = this.token.utenza === 'studente' ? true : false;
    this.token_decode = this.jwtDecode.getTokenDecode(this.token.token);
    this.routing();
    setTimeout(() => {
      this.registroService.loading = false;
    }, 500)
  }

  ngAfterContentInit(): void {
    this.registroService.check = '';
    this.registroService.message = '';
  }

  private async routing(): Promise<void> {
    if (!this.isStudente) {
      this.docenteActive();
    } else {
      this.studenteActive();
    }
  }

  private async docenteActive(): Promise<void> {
    if (JSON.stringify(this.registroService.getUser()) == undefined) {
      await this.loginService.getDocente(this.token_decode.sub)
        .then(
          (res) => {
            this.registroService.setUser(res);
          }).catch(
            (rej) => {
              console.log(rej);
            }
          )
    }
    this.formDocente = this.createFormGroup();
    this.formDocente.addControl('codiceFiscale', new FormControl(this.registroService.getUser().codiceFiscale, [Validators.minLength(16), Validators.maxLength(16)]));
    this.formDocente.addControl('materie', new FormControl(this.registroService.getUser().materie, []));
    this.formDocente.addControl('sezioni', new FormControl(this.registroService.getUser().sezioni, []));
    this.formDocente.disable();
  }

  private async studenteActive(): Promise<void> {
    if (JSON.stringify(this.registroService.getUser()) == undefined) {
      await this.loginService.getStudente(this.token_decode.sub)
        .then(
          (res) => {
            this.registroService.setUser(res);
          }).catch(
            (rej) => {
              console.log(rej);
            }
          );
    }
    console.log(this.registroService.getUser());
    
    this.formStudente = this.createFormGroup();
    this.formStudente.addControl('userCode', new FormControl(this.registroService.getUser().userCode, [Validators.minLength(6), Validators.maxLength(6)]));
    this.formStudente.addControl('sezione', new FormControl(this.registroService.getUser().sezione, [Validators.minLength(2), Validators.maxLength(3)]));
    this.formStudente.disable();
  }

  private createFormGroup(): FormGroup {
    const formUser = new FormGroup({
      nome: new FormControl(this.registroService.getUser().nome, []),
      cognome: new FormControl(this.registroService.getUser().cognome, []),
      mail: new FormControl(this.registroService.getUser().mail, [Validators.email]),
      password: new FormControl('****************', [Validators.minLength(8)]),
    });
    return formUser;
  }

  OnChange(): void {
    this.update = !this.update;
    !this.isStudente ?
      this.setEnable_DisableForm(this.formDocente.disabled, this.formDocente) :
      this.setEnable_DisableForm(this.formStudente.disabled, this.formStudente)
  }

  private setEnable_DisableForm(disabled: boolean, formUser: FormGroup) {
    if (disabled) {
      formUser.get('mail').enable();
      formUser.get('password').enable();
    } else {
      formUser.disable();
    }
  }

  deleteAlert(): void {
    this.registroService.check = '';
    this.registroService.message = '';
  }

  OnSave(): void {
    if (!this.isStudente) {
      this.formDocente.enable();
      this.registroService.updateDocente(this.formDocente);
      this.formDocente.disable();
    } else {
      this.formStudente.enable();
      this.registroService.updateStudent(this.formStudente);
      this.formStudente.disable();
    }
    !this.isStudente ? this.formDocente.disable() : this.formStudente.disable();
    this.update = !this.update;
  }

}

