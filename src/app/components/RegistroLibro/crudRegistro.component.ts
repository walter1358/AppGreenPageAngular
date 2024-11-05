import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { LibrosService } from "../../services/libros.service";
import { Libros, Librosup, soloLibro } from "../../model/libro.model";
import Swal from "sweetalert2";
import { DOCUMENT } from "@angular/common";
import { EditorialService } from "../../services/editorial.service";
import { GeneroService } from "../../services/genero.service";
import { Genero } from "../../model/genero.model";
import { Editorial } from "../../model/editorial.model";
import { response } from "express";
import { AuthService } from "../../services/login.servivio";


@Component({
    selector: 'crudLibros-root',
    templateUrl: './crudRegistro.component.html',
    styleUrls: ['./crudRegistro.component.css']
})

export class CrudLibrosComponent implements OnInit {
    isModalVisible: boolean = false; // Propiedad para controlar la visibilidad del modal
    userData: any;/** */ 
    librosLst: Libros[] = [];
    librosupLst: Librosup[] = [];
    generoLst: Genero[] = [];
    editorialLst: Editorial[] = [];
    titulo: string = 'LIBROS';


    idlibroInput: number = 0;
    ideditorialInput: number = 0;
    idgeneroInput: number = 0;
    editorialInput: string = '';
    generoInput: string = ''
    tituloInput: string = '';
    estadoInput: string = '';
    isbnInput: string = '';
    sinopsisInput: string = '';
    idUsuarioInput:string = '';
    fecha_inicioInput: string = '';
    fecha_finalInput: string = '';
    precio_baseInput: number = 0;

    //************* */
    idlibroAct: number = 0;
    ideditorialAct: number = 0;
    idgeneroAct: number = 0; 
    tituloAct: string = '';
    estadoAct: string = '';
    isbnAct: string = '';
    sinopsisAct: string = '';
    fecha_inicioAct: string = '';
    fecha_finalAct: string = '';
    precio_baseIAct: number = 0;

    ciudades: string[] = ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D', 'Ciudad E'];
    ciudadSeleccionada: string = '';

    // Método para abrir el modal
    abrirModal() {
        this.isModalVisible = true;
    }

    // Método para cerrar el modal
    cerrarModal() {
        this.isModalVisible = false;
    }    

    constructor(private librosService: LibrosService,
        public authService: AuthService,        
        private editorialService: EditorialService,
        private generoService: GeneroService,
        private _renderer2: Renderer2,
        @Inject(DOCUMENT) private _document: Document
    ) { }

    ngAfterViewInit() {

  
        this.cargarLibros();
        

      }  

    cargarLibros(): void {
        this.librosService.obtenerLibros().subscribe(
          (libros) => {
            console.log(libros)
            this.librosLst = libros;
            console.log(this.librosLst)
          },
          (error) => {
            console.error('Error al cargar los libros:', error);
            Swal.fire('Error', 'No se pudieron cargar los libros.', 'error');
          }
        ); }

    getEditorialesConocidas(): Editorial[] {
        return [
          new Editorial(1, 'Editorial Planeta'),
          new Editorial(2, 'Penguin Random House'),
          new Editorial(3, 'HarperCollins'),
          new Editorial(4, 'Grupo Editorial Norma'),
          new Editorial(5, 'Alfaguara'),
          new Editorial(6, 'Anagrama'),
          new Editorial(7, 'Ediciones Destino'),
          new Editorial(8, 'Tusquets Editores'),
          new Editorial(9, 'Lumen'),
          new Editorial(10, 'RBA Libros')
        ];
      }

      getGenerosConocidos(): Genero[] {
        return [
          new Genero(1, 'Ficción'),
          new Genero(2, 'No ficción'),
          new Genero(3, 'Ciencia ficción'),
          new Genero(4, 'Fantasía'),
          new Genero(5, 'Misterio'),
          new Genero(6, 'Romance'),
          new Genero(7, 'Terror'),
          new Genero(8, 'Biografía'),
          new Genero(9, 'Historia'),
          new Genero(10, 'Poesía'),
          new Genero(11, 'Clásicos'),
          new Genero(12, 'Aventura')
        ];
      }


    //Ejemplo de añadir js directamente
    ngOnInit() {
        //this.listarLibros();
        this.cargarLibros();
        console.log(this.librosLst)

        this.listarGenero();
        this.listarEditorial();
        let body = this._document.body;
        let script = this._document.createElement('script');
        script.innerHTML = '';
        script.src = 'assets/sbadmin2/js/demo/datatables-demo.js';
        script.async = true;
        this._renderer2.appendChild(body, script);

    // Suscribirse a los cambios en userData$
        this.authService.userData$.subscribe(data => {
            this.userData = data; // Actualiza userData cuando cambia
        });/** */
        //console.log("User Data es: ", this.userData)
        this.idUsuarioInput = this.userData.id;
        //console.log("El id capturado es: ",  this.idUsuarioInput)

        
    }

   /* listarLibros() {
        this.librosLst = this.getLibrosEnEspanol();
        
        // this.librosService.obtenerLibros()
        //     .subscribe((data: any) => {
        //         //console.log(data);
        //         this.librosLst = data;
        //     })
    }*/


    listarGenero() {
        this.generoLst = this.getGenerosConocidos();

        // this.generoService.obtenerGenero()
        //     .subscribe((data: any) => {
        //         //console.log(data);
        //         this.generoLst = data;
        //     })
    }

    listarEditorial() {
        this.editorialLst= this.getEditorialesConocidas();
        
        // this.editorialService.obtenerEditorial()
        //     .subscribe((data: any) => {
        //         //console.log(data);
        //         this.editorialLst = data;
        //     })
    }

    poblarModal(libros: Libros){
        console.log('este son los libros',libros);
        this.idlibroAct = libros.idLibro
        this.tituloAct = libros.destitulo;
        this.ideditorialAct = libros.idEditorial; 
        this.idgeneroAct = libros.idGenero;
        this.estadoAct = libros.estado;
        this.isbnAct = libros.isbn;
        this.sinopsisAct = libros.sinopsys;
        this.fecha_inicioAct = libros.fecha_inicio;
        this.fecha_finalAct = libros.fecha_final;
        this.precio_baseIAct = libros.precio_base;
        this.abrirModal();
    }

    guardarLibros() {

        if (this.ideditorialInput === 0 || this.idgeneroInput === 0 || this.tituloInput === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Hay campos vacíos',
                text: 'Complete los campos solicitados',
                showCloseButton: true,
            })
        }
        else {
            let lib = new Librosup(
                0,
                this.ideditorialInput, 
                this.idgeneroInput ,
                this.tituloInput, 
                this.estadoInput, 
                this.isbnInput,
                this.sinopsisInput, 
                /*{
                    ideditorial: 0,
                    deseditorial: '' // o algún valor predeterminado si es necesario
                },
                {
                    idgenero: 0,
                    desgenero: '' // o algún valor predeterminado si es necesario
                }  ,*/
                this.idUsuarioInput,
                this.fecha_inicioInput,
                this.fecha_finalInput,
                this.precio_baseInput
                        
            );
            console.log("Guardar", lib)

            //this.librosupLst.push(lib);    
            this.librosService.guardarLibros(lib).subscribe(
                (response) => {
                    console.log('Libro guardado: ', response);
                    //agregamos el libro guardado a la lista
                    //this.librosupLst.push(response);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se guardó correctamente el libro",
                        showConfirmButton: true,
                        showCloseButton: true,
                        showCancelButton: false,                        
                    })
                    this.cargarLibros();
                },
                (error) => {
                    console.error('Error al guardar el libro:', error.error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.error.error || 'No se pudo guardar el libro',
                        showCloseButton: true,
                    });
                }
            )

            /*this.idlibroInput = 0;
            this.tituloInput = '';
            this.estadoInput = '';
            this.isbnInput = '';
            this.sinopsisInput = '';
            this.ideditorialInput = 0;
            this.idgeneroInput = 0;
            this.fecha_inicioInput = '';
            this.fecha_finalInput = '';
            this.precio_baseInput = 0;*/
            //this.listarLibros();
        }

    }

    /*modificarCliente(){
        let lib = new Libros(this.idlibroAct, this.ideditorialAct, this.idgeneroAct, this.tituloAct, this.estadoAct, this.isbnAct,
            this.sinopsisAct, this.fecha_inicioAct, this.fecha_finalAct, this.precio_baseIAct, this.editorialInput, this.generoInput);
        console.log('cliente a modificar:', lib);
        //this.clienteLst.push(cli);
        this.librosService.actualizarLibros(lib)
            .subscribe(
                (response) => {
                    console.log("Resultado del actualizar cliente: ");
                    console.log(response);

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se actualió correctamente el Lbro",
                        showConfirmButton: true,
                        showCloseButton: true,
                        showCancelButton: true,
                        timer: 5000 //en milisegundos
                    });

                        this.idlibroInput = 0;
                        this.tituloInput = '';
                        this.estadoInput = '';
                        this.isbnInput = '';
                        this.sinopsisInput = '';
                        this.ideditorialInput = 0;
                        this.idgeneroInput = 0;
                        this.fecha_inicioInput = '';
                        this.fecha_finalInput = '';
                        this.precio_baseInput = 0;
                        this.cargarLibros();

                    this._document.getElementById('updateModal-close')?.click();
                },
                (error) => {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Algo Pasó!",
                        text: "No se logró crear el Libros, vuelva a intentar",
                        showConfirmButton: true,
                        showCloseButton: true,
                        showCancelButton: true,
                        timer: 5000 //en milisegundos
                    });

                    //this._document.getElementById('updateModal-close')?.click();
                }
            );
    }*/


    modificarCliente(){
        if (this.ideditorialAct === 0 || this.idgeneroAct === 0 || this.tituloAct === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Hay campos vacíos',
                text: 'Complete los campos solicitados',
                showCloseButton: true,
            })
        }
        else {
            let lib = new soloLibro(
                this.idlibroAct,
                this.ideditorialAct, 
                this.idgeneroAct ,
                this.tituloAct, 
                this.estadoAct, 
                this.isbnAct,
                this.sinopsisAct, 
                /*{
                    ideditorial: 0,
                    deseditorial: '' // o algún valor predeterminado si es necesario
                },
                {
                    idgenero: 0,
                    desgenero: '' // o algún valor predeterminado si es necesario
                }  ,*/
                this.idUsuarioInput                        
            ); 
            console.log("Update", lib)            
            this.librosService.actualizarLibros(this.idlibroAct, lib).subscribe(
                (response) => {
                    console.log('Libro actualizado: ', response);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se actualizó correctamente el libro",
                        showConfirmButton: true,
                        showCloseButton: true,
                    });
                    this.cerrarModal(); // Cierra el modal después de actualizar
                    this.cargarLibros();
                     
                    //this.limpiarFormulario();
                },
                (error) => {
                    console.error('Error al actualizar el libro:', error.error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.error.Message || 'No se pudo actualizar el libro',
                        showCloseButton: true,
                    });
                }
            );            

    }
}

    eliminarLibros(id: number) {
        console.log("Eliminar")

        this.librosLst = this.librosLst.filter(libro => libro.idLibro !== id);
        Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Se elimino correctamente el libro",
                    showConfirmButton: true,
                    showCloseButton: true,
                    showCancelButton: false,
                    //timer: 15000 //en milisegundos
                });
        
                //this.listarLibros();

        // this.librosService.eliminarLibros(id).subscribe((response) => {
        //     Swal.fire({
        //         position: "center",
        //         icon: "success",
        //         title: "Se elimino correctamente el libro",
        //         showConfirmButton: true,
        //         showCloseButton: true,
        //         showCancelButton: false,
        //         //timer: 15000 //en milisegundos
        //     });

        //     this.idlibroInput = 0;
        //     this.tituloInput = '';
        //     this.estadoInput = '';
        //     this.isbnInput = '';
        //     this.sinopsisInput = '';
        //     this.listarLibros();
        // },

        //     (error) => {
        //         Swal.fire({
        //             position: "center",
        //             icon: "warning",
        //             title: "Algo Pasó!",
        //             text: "No se logró eliminar el libro, vuelva a intentar",
        //             showConfirmButton: true,
        //             showCloseButton: true,
        //             showCancelButton: true,
        //             timer: 5000 //en milisegundos
        //         });
        //     })


    }

}
