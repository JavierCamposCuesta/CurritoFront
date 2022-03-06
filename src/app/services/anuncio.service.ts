import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Anuncio } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {
  private baseUrl: string = environment.baseUrl; 

   private headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );
    



  constructor(private http: HttpClient) {}
  // listaAnuncios:Anuncio[]=[];
  // termino:string='';

  /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
  misAnuncios(){
    const url = `${this.baseUrl}/profile/mis-anuncios`;

    const headers = this.headers;
      return this.http.get<Anuncio[]>(url, {headers});
    
  }

  /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
   misAnunciosTerminados(){
    const url = `${this.baseUrl}/profile/mis-anuncios-terminados`;

    const headers = this.headers;
      return this.http.get<Anuncio[]>(url, {headers});
    
  }

   /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
    misAnunciosSolicitados(){
      const url = `${this.baseUrl}/profile/mis-anuncios-solicitados`;
  
      const headers = this.headers;
        return this.http.get<Anuncio[]>(url, {headers});
      
    }

     /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
   misAnunciosRealizados(){
    const url = `${this.baseUrl}/profile/mis-anuncios-realizados`;

    const headers = this.headers;
      return this.http.get<Anuncio[]>(url, {headers});
    
  }

  /**
   * Método para registrar usuarios, recibe un usuario y lanza la peticion a la API
   * @param user 
   * @returns Un observable con el resultado de la petición
   */
 addAnuncio(anuncio:Anuncio){
  const url = `${this.baseUrl}/anuncio`;
  // const headers = new HttpHeaders()
  //   .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );
  const headers = this.headers;
    return this.http.post(url, anuncio, {headers});
}

 /**
   * Método para registrar usuarios, recibe un usuario y lanza la peticion a la API
   * @param user 
   * @returns Un observable con el resultado de la petición
   */
  editAnuncio(anuncio:Anuncio){
    const url = `${this.baseUrl}/anuncio/${anuncio.id}`;
    // const headers = new HttpHeaders()
    //   .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );
    const headers = this.headers;
      return this.http.put(url, anuncio, {headers});
  }

  borrarAnuncio(idAnuncio:number){
    const url = `${this.baseUrl}/anuncio/${idAnuncio}`;
    // const headers = new HttpHeaders()
    //   .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );
    const headers = this.headers;
      return this.http.delete(url, {headers});
  }

  //Finalizar anuncio
  finalizarAnuncio(idAnuncio: number){
    const url = `${this.baseUrl}/anuncio/${idAnuncio}/finalizar-anuncio`;
    const headers = this.headers;
      return this.http.get(url, {headers});
  }

  cargarAnunciosRecientes(){
      const url = `${this.baseUrl}/anuncios/anuncios-recientes`;
      return this.http.get<Anuncio[]>(url);
  }

  buscarAnuncio(termino: string, categoria:string, rangoPrecio:number[], orden:string){
    const url = `${this.baseUrl}/anuncios/?termino=${termino}&categoria=${categoria}&rangoPrecio=${rangoPrecio}&orden=${orden}`;
    return this.http.get<Anuncio[]>(url);
  }

  addFavorito(anuncio: Anuncio){
    console.log("llega has aqui")
    const url = `${this.baseUrl}/favoritos`;
    const headers = this.headers;
      return this.http.post(url, anuncio, {headers});
  }

  borrarFavorito(anuncio: Anuncio){
    console.log("llega has aqui")
    const url = `${this.baseUrl}/favoritos/${anuncio.id}`;
    const headers = this.headers;
      return this.http.delete(url, {headers});
  }

  cargarFavoritos(){
    const url = `${this.baseUrl}/favoritos`;
    const headers = this.headers;
      return this.http.get<Anuncio[]>(url, {headers});
  }

  // recogerTermino(termino: string){
  //   this.termino = termino;
  // }

  

  // darListaAnuncios(){
  //   return this.listaAnuncios;
  // }



mostrarAnuncioDetalle(id: any){
  
  const url = `${this.baseUrl}/anuncio/${id}`;
  return this.http.get<Anuncio>(url);
}

solicitarCurrito(anuncio: Anuncio){
  const url = `${this.baseUrl}/anuncios-solicitados`;
  const headers = this.headers;
  return this.http.post(url, anuncio, {headers});
}



  //######### BUSQUEDA DE ANUNCIOS



}