import { Component, Input, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { Anuncio, Categoria } from '../../interfaces/interface';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { CategoriaService } from 'src/app/services/categoria.service';


@Component({
  selector: 'app-mis-curritos',
  templateUrl: './mis-curritos.component.html',
  styleUrls: ['./mis-curritos.component.css'],
  providers: [MessageService]
})


export class MisCurritosComponent implements OnInit {
  constructor(private anuncioService: AnuncioService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private categoriaService: CategoriaService,) { }
  
  ngOnInit(): void {
    this.misAnuncios();
    this.misAnunciosTerminados();
    this.primengConfig.ripple = true;
    this.cargarCategorias();
    
  }

  listaMisAnuncios:Anuncio[]=[];
  listaMisAnunciosTerminados:Anuncio[]=[];
  anuncioSeleccionado:Anuncio={};
  dialogoVisible:boolean = false;
  first = 0;

  rows = 10;
  listaCategorias:Categoria[]=[];

  cargarCategorias(){
    this.categoriaService.mostrarCategorias().subscribe(resp =>{
      this.listaCategorias = resp.data;
    })
  }
  

  /**
   * Este método resuelve la peticion de anuncioService, la cual dará una lista de anuncios que cargamos en la variable listaMisAnuncios
   */
  misAnuncios(){
    this.anuncioService.misAnuncios().subscribe( resp => {
      this.listaMisAnuncios=resp;
      console.log(this.listaMisAnuncios.length)
    })
  }

   /**
   * Este método resuelve la peticion de anuncioService, la cual dará una lista de anuncios terminados que cargamos en la variable listaMisAnunciosTerminados
   */
    misAnunciosTerminados(){
      this.anuncioService.misAnunciosTerminados().subscribe({
          
        next:resp => {
          this.listaMisAnunciosTerminados=resp;
       },
       error:error =>{
        
       }
  
       
       
       
     })
    }

  /**
   * Este método se lanza cuando se pulsa el boton de editar un anuncio
   * @param anuncio 
   */
  seleccionarEventoEditar(anuncio:Anuncio){
    this.mostrarFormulario();
    this.anuncioSeleccionado = anuncio;
  }

  /**
   * Este evento es para mostrar la ventana emergente con el anuncio a editar
   */
  mostrarFormulario() {
    this.dialogoVisible = !this.dialogoVisible;
}

/**
 * Este método borrará un anuncio, le pasamos un id de anuncio por parámatro y resuelve la petición de anuncioService, en el caso de que 
 * se borre el anuncio se llamará al método correspondiente para que se muestre el mensaje adecuado
 * @param idAnuncio 
 */
 borrarAnuncio(idAnuncio:number){
  
   this.anuncioService.borrarAnuncio(idAnuncio).subscribe(
    resp => {
       this.showSuccess()
       this.misAnuncios()
      //  setTimeout(function() {window.location.reload()}, 1000)
       
      },error => {
        this.showError();
      })
      // window.location.reload();
  
}

/**
 * Este metodo se llamará cuando se pulse el boton de finalizar anuncio, se llamará al servicio de anuncio y segun la respuesta se 
 * mostrará el mensaje correspondiente
 * @param idAnuncio 
 */
finalizarAnuncio(idAnuncio: number){
  this.anuncioService.finalizarAnuncio(idAnuncio).subscribe({
          
    next:resp => {
      this.showSuccessFinalizarAnuncio()
      this.misAnuncios();
      this.misAnunciosTerminados();
      
   },
   error: error =>{
    this.showErrorFinalizarAnuncio();
   } 
 })
}

// elegirSolicitante(idAnuncio: Anuncio) {
//   this.confirmationService.confirm({
//       message: 'Are you sure that you want to perform this action?',
//       accept: () => {
//           //Actual logic to perform a confirmation
//       }
//   });
// }

//MENSAJES

/**
 * Este método muestra el mensaje verde con el texto indicado si ha sido posible borrar un anuncio
 */
 showSuccess() {
  this.messageService.add({severity:'success', summary: 'Eliminado', detail: 'El anuncio ha sido eliminado'});
}

/**
 * Este método muestra el mensaje verde con el texto indicado si ha sido posible terminar un anuncio
 */
 showSuccessFinalizarAnuncio() {
  this.messageService.add({severity:'success', summary: 'Guardado', detail: 'El anuncio se ha añadido a terminados'});
}

/**
 * Este método muestra el mensaje rojo con el texto indicado si no ha sido posible borrar un anuncio
 */
showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido eliminar el anuncio'});
}

/**
 * Este método muestra el mensaje rojo con el texto indicado si no ha sido posible terminar un anuncio
 */
 showErrorFinalizarAnuncio() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido finalizar el anuncio'});
}




}
