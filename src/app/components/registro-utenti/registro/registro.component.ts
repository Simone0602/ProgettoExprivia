import { Component, OnInit } from '@angular/core';
import { MatChipListboxChange} from '@angular/material/chips';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: string

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.user = params.get('user');
    });
  }

  onChangeOption(event: MatChipListboxChange) {
    this.router.navigate([`${this.user}/registro-${this.user}/${event.value}`])
  }
}
