import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Anuncio, Categoria, Data, LoginRespuesta } from 'src/app/interfaces/interface';
import { addAnuncioService } from 'src/app/services/addAnuncio.service';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { RegisterService } from 'src/app/services/register.service';
import { ValidatorRegistroService } from 'src/app/services/validatorRegistro.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-currito',
  templateUrl: './add-currito.component.html',
  styleUrls: ['./add-currito.component.css']
})


export class AddCurritoComponent implements OnInit {

  /**
   * Comprobamos si es un anuncio para editar o no
   */
  @Input() edit=false;

  /**
   * Con esto conseguimos el anuncio que queremos editar, el cual lleva consigo el id del anuncio
   */
  @Input() anuncioEditar:Anuncio= {};
  titulo:string='';
  botonRegistro:string = '';

  

  miFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    categoria: ['', [ Validators.required]],
    precio: ['', [ Validators.required  ]],
    tipoPrecio: ['', [ Validators.required  ]  ],
    descripcion: [''  ],
    // file: ['', [ Validators.required, Validators.pattern(this.ValidatorRegistroService.nombrePattern)]  ],
    ubicacion: ['' ],
    id:['']
  },
  {
  
  }
  );
  
  solucion: string = "";
  private baseUrl: string = environment.baseUrl; 
  
  constructor( private fb: FormBuilder,
    private ValidatorRegistroService: ValidatorRegistroService,
    private registerService: RegisterService,
    private http: HttpClient,
    private router:Router,
    private categoriaService:CategoriaService,
    private addAnuncioService: addAnuncioService,
    private anuncioService: AnuncioService ) { }
    
    
    ngOnInit(): void {
      
      this.miFormulario.reset({
        titulo: '',
        categoria: '',
        precio: '',
        tipoPrecio: '',
        descripcion: '',
        ubicacion: '',
        id:''
      })

      this.titulo = "Nuevo Currito";
      this.botonRegistro ="Subir anuncio";



      this.mostrarCategorias();
    }

    /**
     * Si accedemos a este componente a través de editar anuncio, rellenaremos los campos con el anuncio que nos hemos traido
     */
    ngOnChanges(): void{
      this.miFormulario.reset({
        titulo: this.anuncioEditar.titulo,
        categoria: this.anuncioEditar.categoria,
        precio: this.anuncioEditar.precio,
        tipoPrecio: this.anuncioEditar.tipoPrecio,
        descripcion: this.anuncioEditar.descripcion,
        ubicacion: '',
        id: this.anuncioEditar.id
      })

      this.titulo= "Editar Currito";
      this.botonRegistro = "Actualizar anuncio"
    }
    
    campoNoValido( campo: string ) {
     
      // this.findInvalidControlsRecursive(this.miFormulario);
      return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
    }
  
      /**
       * Este metodo llamará al metodo añadirAnuncio y marcará todos los campos del formulario como marcados
       */
      submitFormulario() {
      
        if(this.botonRegistro == 'Actualizar anuncio'){
          this.editarAnuncio();
        }
        else{
          this.addCurrito()

        }
       
      
        this.miFormulario.markAllAsTouched();
      
      }
  
      
      /**
       * Este metodo recibira un usuario del formulario y llamara 
       * a registerService para realizar una peticion post de añadir
       * el usuario
       */
      addCurrito(){
        let respuesta: LoginRespuesta = {};
        let solucion: string;
        const anuncio = {
          "titulo": this.miFormulario.get("titulo")?.value,
          "categoria": this.miFormulario.get("categoria")?.value,
          "precio": this.miFormulario.get("precio")?.value,
          "tipoPrecio": this.miFormulario.get("tipoPrecio")?.value,
          "descripcion": this.miFormulario.get("descripcion")?.value,
          "ubicacion": this.miFormulario.get("ubicacion")?.value
          

          
          
  
      }
      console.log(this.miFormulario);
      this.anuncioService.addAnuncio(anuncio).subscribe({
          
        next:resp => {
          respuesta = resp;
          // console.log(repuesta.jwt_token)
         if(respuesta.jwt_token != null){
           localStorage.setItem('jwt', respuesta.jwt_token);
           this.router.navigate(['home']);
           solucion = "true";
         }
       },
       error(error){
         solucion = "error";
        //  localStorage.removeItem('jwt');
         Swal.fire({
           title: 'Error al crear anuncio',
           text: 'Vuelve a intentarlo',
           icon: 'error',
           confirmButtonText: 'Ok'
         })
       }
  
       
       
       
     })
      }

      editarAnuncio(){
        let respuesta: LoginRespuesta = {};
        let solucion: string;
        const anuncio = {
          "titulo": this.miFormulario.get("titulo")?.value,
          "categoria": this.miFormulario.get("categoria")?.value,
          "precio": this.miFormulario.get("precio")?.value,
          "tipoPrecio": this.miFormulario.get("tipoPrecio")?.value,
          "descripcion": this.miFormulario.get("descripcion")?.value,
          "ubicacion": this.miFormulario.get("ubicacion")?.value,
          "id":this.miFormulario.get("id")?.value

          
          
  
      }
      console.log(this.miFormulario);
      this.anuncioService.editAnuncio(anuncio).subscribe({
          
        next:resp => {
          respuesta = resp;
          // console.log(repuesta.jwt_token)
          
          //  localStorage.setItem('jwt', respuesta.jwt_token);
          //  this.router.navigate(['profile/misCurritos']);
           Swal.fire({
            title: 'Error al editar anuncio',
            text: 'Vuelve a intentarlo',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
          window.location.reload();
          //  solucion = "true";
         
       },
       error(error){
         solucion = "error";
        //  localStorage.removeItem('jwt');
         Swal.fire({
           title: 'Error al editar anuncio',
           text: 'Vuelve a intentarlo',
           icon: 'error',
           confirmButtonText: 'Ok'
         })
       }
  
       
       
       
     })
      }

      
  
      listaCategorias:Data={
        data:[],
        page:0,
        limit:0
      };
   /**
     * Metodo para mostrar la lista de categorias, la cual la recibe del servicio categoriaService
     */
    mostrarCategorias(){
      this.categoriaService.mostrarCategorias()
      .subscribe( resp => {
        this.listaCategorias=resp;
        
      })
  }
  
  
  }
  
  
  
