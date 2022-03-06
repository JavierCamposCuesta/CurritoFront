import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-card-recientes',
  templateUrl: './card-recientes.component.html',
  styleUrls: ['./card-recientes.component.css']
})
export class CardRecientesComponent implements OnInit {

  constructor(private anuncioService : AnuncioService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.cargarAnunciosRecientes();
  }

  anunciosRecientes:Anuncio[]=[];

  cargarAnunciosRecientes(){
    this.anuncioService.cargarAnunciosRecientes().subscribe({
          
      next:resp => {
        this.anunciosRecientes = resp;
        this.anunciosRecientes.splice(9)
        
     },
     error: error =>{
      
     }
  
     
     
     
   })
  }

  //Metodos para añadir a favoritos
addFavoritos(anuncio:Anuncio, evento:any) {
 
  console.log(evento.target)
  
   this.loginService.validarToken().subscribe({
         
    next:resp => {

      if(evento.target.classList.contains("bi-heart-fill")){
        console.log("clase correcta")
        this.borrarFavorito(anuncio,evento)
      }
      else{
        
        this.addFavoritosEstaLogueado(anuncio, evento)
      }
      
   },
   error: error =>{
     
     this.router.navigate(['login'])
   }
 })
}

addFavoritosEstaLogueado(anuncio: Anuncio, evento:any){
  this.anuncioService.addFavorito(anuncio).subscribe({
    next:resp => {
      evento.target.classList.remove('bi-heart')
      evento.target.classList.add("bi-heart-fill")
      console.log("Añadido correctamente")
   },
   error: error =>{
    
   }
  })
  
}

borrarFavorito(anuncio: Anuncio, evento:any){
  this.anuncioService.borrarFavorito(anuncio).subscribe({
    next:resp => {
      evento.target.classList.add('bi-heart')
        evento.target.classList.remove("bi-heart-fill")
      console.log("borrado correctamente")
   },
   error: error =>{
    
    
   }
  })
}


}
