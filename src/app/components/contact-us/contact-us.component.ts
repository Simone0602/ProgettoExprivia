import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ContattaciService } from 'src/app/service/contattaci.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, AfterContentInit{
  form: FormGroup;
  descrizione: string = "<p>Inserisci il tuo feedback.</p>";

  Editor: any = ClassicEditor;

  constructor(public contattaciService: ContattaciService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email]),
      descrizione: new FormControl(null, [Validators.required])
    });
  }

  ngAfterContentInit(): void {
    this.contattaciService.check = '';
    this.contattaciService.message = '';
  }

  deleteAlert(): void{
    this.contattaciService.check = '';
    this.contattaciService.message = '';
  }

  send(): void{
    this.contattaciService.sendMail(this.form);
  }
}
