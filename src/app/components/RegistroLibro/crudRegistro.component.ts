import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { LibrosService } from "../../services/libros.service";
import { Libros } from "../../model/libro.model";
import Swal from "sweetalert2";
import { DOCUMENT } from "@angular/common";
import { EditorialService } from "../../services/editorial.service";
import { GeneroService } from "../../services/genero.service";
import { Genero } from "../../model/genero.model";
import { Editorial } from "../../model/editorial.model";

@Component({
    selector: 'crudLibros-root',
    templateUrl: './crudRegistro.component.html',
    styleUrls: ['./crudRegistro.component.css']
})

export class CrudLibrosComponent implements OnInit {
    librosLst: Libros[] = [];
    generoLst: Genero[] = [];
    editorialLst: Editorial[] = [];
    titulo: string = 'LIBROS';


    idlibroInput: number = 0;
    ideditorialInput: number = 0;
    idgeneroInput: number = 0;
    tituloInput: string = '';
    estadoInput: string = '';
    isbnInput: string = '';
    sinopsisInput: string = '';
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

    constructor(private librosService: LibrosService,
        private editorialService: EditorialService,
        private generoService: GeneroService,
        private _renderer2: Renderer2,
        @Inject(DOCUMENT) private _document: Document
    ) { }

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

     /* getLibrosEnEspanol(): Libros[] {
        return [
          new Libros(1, 1, 1, 'Cien años de soledad', 'Usado', '978-3-16-148410-0', 'Una novela sobre la familia Buendía.', '1967-06-05', '', 15.99),
          new Libros(2, 1, 2, 'El amor en los tiempos del cólera', 'Usado', '978-3-16-148410-1', 'Historia de un amor imposible.', '1985-06-05', '', 14.99),
          new Libros(3, 2, 1, 'La sombra del viento', 'Usado', '978-3-16-148410-2', 'Una historia de misterio en la Barcelona de la postguerra.', '2001-04-17', '', 12.99),
          new Libros(4, 2, 3, 'Los detectives salvajes', 'Usado', '978-3-16-148410-3', 'Una novela sobre poetas en México.', '1998-03-01', '', 18.50),
          new Libros(5, 3, 2, 'Ficciones', 'Usado', '978-3-16-148410-4', 'Cuentos de realidad y fantasía de Borges.', '1944-01-01', '', 10.99),
          new Libros(6, 3, 1, 'Rayuela', 'Usado', '978-3-16-148410-5', 'Una novela innovadora y experimental de Julio Cortázar.', '1963-04-28', '', 16.75),
          new Libros(7, 4, 1, 'El túnel', 'Usado', '978-3-16-148410-6', 'Un thriller psicológico de Ernesto Sabato.', '1948-01-01', '', 11.50),
          new Libros(8, 4, 4, 'Pedro Páramo', 'Usado', '978-3-16-148410-7', 'Una obra maestra de la literatura mexicana.', '1955-01-01', '', 12.00),
          new Libros(9, 5, 2, 'Crónica de una muerte anunciada', 'Usado', '978-3-16-148410-8', 'Un relato sobre el destino y la fatalidad.', '1981-01-01', '', 13.25),
          new Libros(10, 5, 3, 'La casa de los espíritus', 'Usado', '978-3-16-148410-9', 'Una saga familiar con elementos sobrenaturales.', '1982-01-01', '', 15.50),
          new Libros(11, 6, 1, 'Los miserables', 'Usado', '978-3-16-148411-0', 'Una novela sobre la redención y la justicia.', '1862-01-01', '', 9.99),
          new Libros(12, 6, 2, 'Don Quijote de la Mancha', 'Usado', '978-3-16-148411-1', 'La historia de un noble loco y sus aventuras.', '1605-01-01', '', 10.50),
          new Libros(13, 7, 3, 'El Aleph', 'Usado', '978-3-16-148411-2', 'Cuentos de Borges que exploran el infinito.', '1949-01-01', '', 12.25),
          new Libros(14, 7, 1, 'Como agua para chocolate', 'Nuevo', '978-3-16-148411-3', 'Una novela sobre amor y comida en México.', '1989-01-01', '', 14.75),
          new Libros(15, 8, 2, 'El jardín secreto', 'Usado', '978-3-16-148411-4', 'Un cuento sobre la redención y la naturaleza.', '1911-01-01', '', 10.00),
          new Libros(16, 8, 4, 'La tregua', 'Usado', '978-3-16-148411-5', 'Una novela sobre la vida de un hombre solitario.', '1960-01-01', '', 11.00),
          new Libros(17, 9, 1, 'Cuentos de la selva', 'Usado', '978-3-16-148411-6', 'Relatos sobre la selva y la vida salvaje.', '1918-01-01', '', 12.50),
          new Libros(18, 9, 2, 'El perro rabioso', 'Usado', '978-3-16-148411-7', 'Un cuento sobre la vida en el campo.', '1923-01-01', '', 9.75),
          new Libros(19, 10, 3, 'La invención de Morel', 'Usado', '978-3-16-148411-8', 'Una historia de amor y realidad.', '1940-01-01', '', 13.00),
          new Libros(20, 10, 1, 'Niebla', 'Usado', '978-3-16-148411-9', 'Una novela sobre la identidad y la locura.', '1905-01-01', '', 11.25),
          new Libros(21, 11, 4, 'Historias de la guerra de los mundos', 'Usado', '978-3-16-148412-0', 'Un relato sobre la guerra y sus consecuencias.', '1898-01-01', '', 15.00),
          new Libros(22, 11, 1, 'Cuentos de la selva', 'Usado', '978-3-16-148412-1', 'Cuentos sobre la vida en la selva.', '1918-01-01', '', 12.50),
          new Libros(23, 12, 2, 'Mujer que sabe', 'Usado', '978-3-16-148412-2', 'Un libro sobre la fortaleza de la mujer.', '2005-01-01', '', 13.75),
          new Libros(24, 12, 3, 'La casa de la playa', 'Usado', '978-3-16-148412-3', 'Una novela sobre amor y pérdida.', '2001-01-01', '', 14.50),
          new Libros(25, 13, 1, 'La reina del sur', 'Usado', '978-3-16-148412-4', 'La historia de una mujer poderosa.', '2002-01-01', '', 15.99),
          new Libros(26, 13, 4, 'El mar y el tiempo', 'Usado', '978-3-16-148412-5', 'Una novela sobre el paso del tiempo.', '1998-01-01', '', 16.00),
          new Libros(27, 14, 1, 'La vida es sueño', 'Usado', '978-3-16-148412-6', 'Una obra teatral sobre la realidad y los sueños.', '1635-01-01', '', 11.50),
          new Libros(28, 14, 2, 'Los pazos de Ulloa', 'Usado', '978-3-16-148412-7', 'Una novela sobre la sociedad española.', '1886-01-01', '', 12.25),
          new Libros(29, 15, 3, 'El extranjero', 'Usado', '978-3-16-148412-8', 'Una novela sobre la existencia y la absurdidad.', '1942-01-01', '', 13.00),
          new Libros(30, 15, 1, 'Cien años de soledad', 'Usado', '978-3-16-148412-9', 'La historia de la familia Buendía.', '1967-06-05', '', 14.99)
        ];
      }*/

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
        this.idlibroAct = libros.idlibro
        this.tituloAct = libros.destitulo;
        this.ideditorialAct = libros.ideditorial;
        this.idgeneroAct = libros.idgenero;
        this.estadoAct = libros.estado
        this.isbnAct = libros.isbn;
        this.sinopsisAct = libros.sinopsis;
        this.fecha_inicioAct = libros.fecha_inicio;
        this.fecha_finalAct = libros.fecha_final;
        this.precio_baseIAct = libros.precio_base;
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
            let lib = new Libros(0, this.ideditorialInput, this.idgeneroInput, this.tituloInput, this.estadoInput, this.isbnInput,
                this.sinopsisInput, this.fecha_inicioInput, this.fecha_finalInput, this.precio_baseInput);
            console.log("Guardar", lib)

            this.librosLst.push(lib);    
            Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se guardo correctamente el libro",
                        showConfirmButton: true,
                        showCloseButton: true,
                        showCancelButton: false,
                        //timer: 5000 //en milisegundos
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
            //this.listarLibros();
           
                            // this.librosService.guardarLibros(lib)
            //     .subscribe(
            //         (response) => {
            //             console.log("Resultado del guardar libros: ");
            //             console.log(response);

            //             Swal.fire({
            //                 position: "center",
            //                 icon: "success",
            //                 title: "Se guardo correctamente el libro",
            //                 showConfirmButton: true,
            //                 showCloseButton: true,
            //                 showCancelButton: false,
            //                 //timer: 5000 //en milisegundos
            //             });

            //             this.idlibroInput = 0;
            //             this.tituloInput = '';
            //             this.estadoInput = '';
            //             this.isbnInput = '';
            //             this.sinopsisInput = '';
            //             this.ideditorialInput = 0;
            //             this.idgeneroInput = 0;
            //             this.fecha_inicioInput = '';
            //             this.fecha_finalInput = '';
            //             this.precio_baseInput = 0;
            //             this.listarLibros();
            //         },
            //         (error) => {
            //             Swal.fire({
            //                 position: "center",
             //                 icon: "warning",
            //                 title: "Algo Pasó!",
            //                 text: "No se logró guardar el libro, vuelva a intentar",
            //                 showConfirmButton: true,
            //                 showCloseButton: true,
            //                 showCancelButton: true,
            //                 timer: 5000 //en milisegundos
            //             });
            //         }
            //     );
        }

    }

    modificarCliente(){
        let lib = new Libros(this.idlibroAct, this.ideditorialAct, this.idgeneroAct, this.tituloAct, this.estadoAct, this.isbnAct,
            this.sinopsisAct, this.fecha_inicioAct, this.fecha_finalAct, this.precio_baseIAct);
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
    }


    eliminarLibros(id: number) {
        console.log("Eliminar")

        this.librosLst = this.librosLst.filter(libro => libro.idlibro !== id);
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
