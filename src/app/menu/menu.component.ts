import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  aperturaChiusura = false;
  active = 'Home';

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  navigazioneNavbar(value: string): void{
    this.active = value;
  }
}

