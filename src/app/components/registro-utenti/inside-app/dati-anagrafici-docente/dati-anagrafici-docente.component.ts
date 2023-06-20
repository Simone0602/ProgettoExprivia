import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Docente } from 'src/app/class/Docente';
import { Response } from 'src/app/class/Response';
import { JwtDecodeService } from 'src/app/service/jwt/jwt-decode.service';
import { LoginService } from 'src/app/service/login.service';
import { RegistroService } from 'src/app/service/registro.service';

@Component({
  selector: 'app-dati-anagrafici-docente',
  templateUrl: './dati-anagrafici-docente.component.html',
  styleUrls: ['./dati-anagrafici-docente.component.css']
})
export class DatiAnagraficiDocenteComponent implements OnInit, AfterContentInit, OnDestroy {
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
    this.getDocente();
    setTimeout(() => {
      this.registroService.loading = false;
    }, 500)
  }

  ngAfterContentInit(): void {
    this.registroService.check = '';
    this.registroService.message = '';
  }

  ngOnDestroy(): void {
    this.registroService.setDocenteDatiAnagrafici(undefined);
  }

  private async getDocente(): Promise<void> {
    await this.loginService.getDocente(this.token_decode.sub)
      .then(
        (res) => {
          this.registroService.setDocenteDatiAnagrafici(res);
        }).catch(
          (rej) => {
            console.log(rej);
          }
        )
    this.form = this.createFormGroup();
    this.form.disable();
  }

  private createFormGroup(): FormGroup {
    const docente: Docente = this.registroService.getDocenteDatiAnagrafici();
    const formUser = new FormGroup({
      nome: new FormControl(docente.nome, [Validators.required]),
      cognome: new FormControl(docente.cognome, [Validators.required]),
      mail: new FormControl(docente.mail, [Validators.required, Validators.email]),
      password: new FormControl('****************', [Validators.required, Validators.minLength(8)]),
      codiceFiscale: new FormControl(docente.codiceFiscale, [Validators.minLength(16), Validators.maxLength(16)]),
      materie: new FormControl(docente.materie, [Validators.required]),
      sezioni: new FormControl(docente.sezioni, [Validators.required])
    });
    return formUser;
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

  deleteAlert(): void {
    this.registroService.check = '';
    this.registroService.message = '';
  }

  OnSave(): void {
    this.form.enable();
    this.registroService.updateDocente(this.form.value);
    this.form.disable();
    this.update = !this.update;
  }
}
