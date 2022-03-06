import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() busqueda: string='';
  // @Output() onEnter: EventEmitter<string> = new EventEmitter();
  // busqueda2: string = "";
  
  constructor(private anuncioService:AnuncioService, private router: Router) { }

  ngOnInit(): void {
  }

  // buscar(){
  //   this.onEnter.emit(this.busqueda);
  // }

  // buscar(busqueda :string){
  //   this.busqueda = busqueda;
  //   this.anuncioService.recogerTermino(this.busqueda)
  //   if(this.router.url === '/anuncio'){
  //     location
  //   }
  //   else{
  //     this.router.navigate(['anuncio']);

  //   }

  // }

}
