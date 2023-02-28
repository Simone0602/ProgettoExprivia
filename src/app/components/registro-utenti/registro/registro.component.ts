import { Component, OnInit } from '@angular/core';
import { MatChipListboxChange} from '@angular/material/chips';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RegistroService } from 'src/app/service/registro-service/service-dati/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: string

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    public registroService: RegistroService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.user = params.get('user');
    });
  }

  onChangeOption(event: MatChipListboxChange) {
    const percorso = this.user === 'studente' ? 'famiglie' : 'docente'
    this.router.navigate([`${this.user}`, 'registro', `registro-${percorso}`, `${event.value}`])
  }
}
