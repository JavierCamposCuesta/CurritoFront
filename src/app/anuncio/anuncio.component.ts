import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  @Input() busqueda: string='';
  constructor() { }

  ngOnInit(): void {
    console.log(this.busqueda)
  }

  ngOnChanges(): void{
    console.log(this.busqueda)
  }

  buscar(){
    console.log(this.busqueda);
  }
}
