import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: string

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.user = params.get('user');
    });
  }
}
