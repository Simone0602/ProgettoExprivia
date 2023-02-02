import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  listaImmagini = [
    'https://azzurro.it/wp-content/uploads/2020/07/progetti-scuola-telefono-azzurro.jpg',
    'https://thumbs.dreamstime.com/b/libro-aperto-libri-della-libro-con-copertina-rigida-sulla-tavola-di-legno-fondo-di-istruzione-di-nuovo-al-banco-copi-lo-spazio-per-76106466.jpg',
    'https://img.freepik.com/free-photo/school-desk-with-textbooks-near-blackboard_23-2148207696.jpg',
    'https://www.oggiscuola.com/web/wp-content/uploads/2021/05/nuovo.jpg'
  ]
  numeroPagina = 0;
  immagine = this.listaImmagini[0];

  constructor(){}

  ngOnInit(): void {
  }

  cambioImmagineByCarouselSlide(number: number): void{
    this.immagine = this.listaImmagini[number];
    this.numeroPagina = number;
  }

  cambioImmagineByButton(value: string): void{
    if(value=='prev'){
      if(this.numeroPagina>0){
        this.immagine = this.listaImmagini[this.numeroPagina-1];
        this.numeroPagina = this.numeroPagina-1;
      }
    }else{
      if(this.numeroPagina<this.listaImmagini.length-1){
        this.immagine = this.listaImmagini[this.numeroPagina+1];
        this.numeroPagina = this.numeroPagina+1;
      }
    }
  }

}
