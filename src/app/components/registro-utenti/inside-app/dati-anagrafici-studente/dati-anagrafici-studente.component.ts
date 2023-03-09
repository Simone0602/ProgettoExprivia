import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from 'src/app/class/Response';
import { Studente } from 'src/app/class/Studente';
import { JwtDecodeService } from 'src/app/service/jwt/jwt-decode.service';
import { LoginService } from 'src/app/service/login-service/service-dati/login.service';
import { RegistroService } from 'src/app/service/registro-service/service-dati/registro.service';

@Component({
  selector: 'app-dati-anagrafici-studente',
  templateUrl: './dati-anagrafici-studente.component.html',
  styleUrls: ['./dati-anagrafici-studente.component.css']
})
export class DatiAnagraficiStudenteComponent implements OnInit, AfterContentInit, OnDestroy{
  update: boolean = false;

  form: FormGroup;

  private token: Response;
  private token_decode: { sub: string, exp: Date, iat: Date };

  constructor(private loginService: LoginService,
    public registroService: RegistroService,
    private jwtDecode: JwtDecodeService) { }

  ngOnInit(): void {
    this.registroService.loading = true;
    this.token = JSON.parse(localStorage.getItem("token"));
    this.token_decode = this.jwtDecode.getTokenDecode(this.token.token);
    this.getStudente();
    setTimeout(() => {
      this.registroService.loading = false;
    }, 500)
  }

  ngAfterContentInit(): void {
    this.registroService.check = '';
    this.registroService.message = '';
  }

  ngOnDestroy(): void {
    this.registroService.setStudenteDatiAnagrafici(undefined);
  }

  private async getStudente(): Promise<void> {
    await this.loginService.getStudente(this.token_decode.sub)
      .then(
        (res) => {
          this.registroService.setStudenteDatiAnagrafici(res);
        }).catch(
          (rej) => {
            console.log(rej);
          }
        );
    this.form = this.createFormGroup();
    this.form.disable();
  }

  private createFormGroup(): FormGroup {
    const studente: Studente = this.registroService.getStudenteDatiAnagrafici();
    const formUser = new FormGroup({
      nome: new FormControl(studente.nome, [Validators.required]),
      cognome: new FormControl(studente.cognome, [Validators.required]),
      mail: new FormControl(studente.mail, [Validators.required, Validators.email]),
      password: new FormControl('****************', [Validators.required, Validators.minLength(8)]),
      userCode: new FormControl(studente.userCode, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      sezione: new FormControl(studente.sezione, [Validators.minLength(2), Validators.maxLength(3)])
    });
    return formUser;
  }

  deleteAlert(): void {
    this.registroService.check = '';
    this.registroService.message = '';
  }

  OnChange(): void {
    this.update = !this.update;
    if (this.form.disabled) {
      this.form.get('mail').enable();
      this.form.get('password').enable();
    } else {
      this.form.disable();
    }
  }

  OnSave(): void {
    this.form.enable();
    this.registroService.updateStudent(this.form);
    this.form.disable();
    this.update = !this.update;
  }
}
