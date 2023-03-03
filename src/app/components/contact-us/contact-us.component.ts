import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  form: FormGroup;
  descrizione: string = "<p>Inserisci il tuo feedback.</p>";

  Editor: any = ClassicEditor;

  constructor(){}

  ngOnInit(): void {
    this.form = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email]),
      descrizione: new FormControl(null, [Validators.required])
    }); 
  }

  send(): void{
    console.log(this.form.value);
  }
}
