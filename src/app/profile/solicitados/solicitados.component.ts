import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-solicitados',
  templateUrl: './solicitados.component.html',
  styleUrls: ['./solicitados.component.css']
})
export class SolicitadosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService) { }

  ngOnInit(): void {
    this.misAnunciosRealizados();
    this.misAnunciosSolicitados();
  }

  listaMisAnunciosSolicitados:Anuncio[]=[];
  listaMisAnunciosRealizados:Anuncio[]=[];
  first = 0;

  rows = 10;


  misAnunciosSolicitados(){
    this.anuncioService.misAnunciosSolicitados().subscribe( resp => {
      this.listaMisAnunciosSolicitados=resp;
      
    })
  }

  misAnunciosRealizados(){
    this.anuncioService.misAnunciosRealizados().subscribe( resp => {
      this.listaMisAnunciosRealizados=resp;
      
    })
  }

}
