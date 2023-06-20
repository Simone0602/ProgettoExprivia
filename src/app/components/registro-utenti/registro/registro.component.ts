import { Component, OnInit } from '@angular/core';
import { MatChipListboxChange} from '@angular/material/chips';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RegistroService } from 'src/app/service/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: string
  selezioneNavbarRegistro: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public registroService: RegistroService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.user = params.get('user');
    });
    this.selezioneByRouting();
  }

  private selezioneByRouting(): void{
    const position = this.router.url.lastIndexOf('/');
    this.selezioneNavbarRegistro = this.router.url.substring(position + 1);
  }

  onChangeOption(event: MatChipListboxChange) {
    const percorso = this.user === 'studente' ? 'famiglie' : 'docente'
    this.router.navigate([`${this.user}`, 'registro', `registro-${percorso}`, `${event.value}`])
  }
}
