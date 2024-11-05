import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import Swal from "sweetalert2";
import { DOCUMENT } from '@angular/common';
import { NuevaOfertaService } from '../../services/NuevaOferta.service';
import { NuevaOferta } from '../../model/nuevaOferta.model';
import { AuthService } from '../../services/login.servivio';
import { Router } from '@angular/router';
import { Libros } from '../../model/libro.model';
import { LibrosService } from '../../services/libros.service';
import { Libros2Service } from '../../services/libros2.service';
import { SubastaService } from '../../services/subasta.service';
import { Subasta } from '../../model/Subasta.model';

@Component({
  selector: 'app-libro2',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.css']
})
export class Libro2Component implements OnInit {
  subastaLst: Subasta[] = [];
  subastasConDetalles: Subasta[] = [];
  titulo: string = 'SUBASTA x';

  public idlibroInput: number = 0;
  public ideditorialInput: number = 0;
  public idgeneroInput: number = 0;
  public tituloInput: string = '';
  public estadoInput: string = '';
  public isbnInput: string = '';
  public sinopsisInput: string = '';
  public fecha_inicioInput: string = '';
  public fecha_finalInput: string = '';
  public precio_baseInput: number = 0;

  //Nuva Oferta
  public idnuevaofertaInput: number = 0;
  public precio_ofertaInput: number = 0;

  cargarModal(subasta: Subasta) {
    console.log('este es el cliente', subasta);
    this.tituloInput = subasta.tituloLibro;
    this.fecha_inicioInput = subasta.fechaInicio;
    this.fecha_finalInput = subasta.fechaFin;
    this.precio_baseInput = subasta.precioBase;

  }

  constructor(private subastaService: SubastaService,
    private authService: AuthService,
    private router: Router,
    private nuevaOfertaService: NuevaOfertaService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }


  onSubmit() {
    this.router.navigate(['/RegistroLibros']);
  }


  ofSubmit() {
    this.router.navigate(['/nuevaOferta']);
  }


  //Ejemplo de añadir js directamente
  ngOnInit() {
    //this.carg();
    let body = this._document.body;
    let script = this._document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/sbadmin2/js/demo/datatables-demo.js';
    script.async = true;
    body.appendChild(script);
  }

  /*listarLibros() {
    this.LibrosLst = this.getLibrosEnEspanol();
    // this.librosService.obtenerLibros()
    //   .subscribe((data: any) => {
    //     //console.log(data);
    //     this.LibrosLst = data;
    //   })
  }*/

    ngAfterViewInit() {

  
      this.cargarSubasta();
      

    } 

  cargarSubasta(): void {
      this.subastaService.obtenerSubasta().subscribe(
        (subasta) => {
          console.log(subasta)
          this.subastasConDetalles = subasta;
          //this.subastaList = subasta;
          console.log(this.subastasConDetalles)
        },
        (error) => {
          console.error('Error al cargar los libros:', error);
          Swal.fire('Error', 'No se pudieron cargar los libros.', 'error');
        }
      ); }

 
      

 /* getLibrosEnEspanol(): Libros[] {
    return [
      new Libros(1, 1, 1, 'Cien años de soledad', 'Usado', '978-3-16-148410-0', 'Una novela sobre la familia Buendía.', '2024-09-24', '2024-10-11', 15.99),
      new Libros(2, 1, 2, 'El amor en los tiempos del cólera', 'Usado', '978-3-16-148410-1', 'Historia de un amor imposible.', '2024-09-24', '2024-10-11', 14.99),
      new Libros(3, 2, 1, 'La sombra del viento', 'Usado', '978-3-16-148410-2', 'Una historia de misterio en la Barcelona de la postguerra.', '2024-09-24', '2024-10-11', 12.99),
      new Libros(4, 2, 3, 'Los detectives salvajes', 'Usado', '978-3-16-148410-3', 'Una novela sobre poetas en México.', '2024-09-24', '2024-10-11', 18.50),
      new Libros(5, 3, 2, 'Ficciones', 'Usado', '978-3-16-148410-4', 'Cuentos de realidad y fantasía de Borges.', '2024-09-24', '2024-10-11', 10.99),
      new Libros(6, 3, 1, 'Rayuela', 'Usado', '978-3-16-148410-5', 'Una novela innovadora y experimental de Julio Cortázar.', '2024-09-24', '2024-10-11', 16.75),
      new Libros(7, 4, 1, 'El túnel', 'Usado', '978-3-16-148410-6', 'Un thriller psicológico de Ernesto Sabato.', '2024-09-24', '2024-10-11', 11.50),
      new Libros(8, 4, 4, 'Pedro Páramo', 'Usado', '978-3-16-148410-7', 'Una obra maestra de la literatura mexicana.', '2024-09-24', '2024-10-11', 12.00),
      new Libros(9, 5, 2, 'Crónica de una muerte anunciada', 'Usado', '978-3-16-148410-8', 'Un relato sobre el destino y la fatalidad.', '2024-09-24', '2024-10-11', 13.25),
      new Libros(10, 5, 3, 'La casa de los espíritus', 'Usado', '978-3-16-148410-9', 'Una saga familiar con elementos sobrenaturales.', '2024-09-24', '2024-10-11', 15.50),
      new Libros(11, 6, 1, 'Los miserables', 'Usado', '978-3-16-148411-0', 'Una novela sobre la redención y la justicia.', '2024-09-24', '2024-10-11', 9.99),
      new Libros(12, 6, 2, 'Don Quijote de la Mancha', 'Usado', '978-3-16-148411-1', 'La historia de un noble loco y sus aventuras.', '2024-09-24', '2024-10-11', 10.50),
      new Libros(13, 7, 3, 'El Aleph', 'Usado', '978-3-16-148411-2', 'Cuentos de Borges que exploran el infinito.', '2024-09-24', '2024-10-11', 12.25),
      new Libros(14, 7, 1, 'Como agua para chocolate', 'Nuevo', '978-3-16-148411-3', 'Una novela sobre amor y comida en México.', '2024-09-24', '2024-10-11', 14.75),
      new Libros(15, 8, 2, 'El jardín secreto', 'Usado', '978-3-16-148411-4', 'Un cuento sobre la redención y la naturaleza.', '2024-09-24', '2024-10-11', 10.00),
      new Libros(16, 8, 4, 'La tregua', 'Usado', '978-3-16-148411-5', 'Una novela sobre la vida de un hombre solitario.', '2024-09-24', '2024-10-11', 11.00),
      new Libros(17, 9, 1, 'Cuentos de la selva', 'Usado', '978-3-16-148411-6', 'Relatos sobre la selva y la vida salvaje.', '2024-09-24', '2024-10-11', 12.50),
      new Libros(18, 9, 2, 'El perro rabioso', 'Usado', '978-3-16-148411-7', 'Un cuento sobre la vida en el campo.', '2024-09-24', '2024-10-11', 9.75),
      new Libros(19, 10, 3, 'La invención de Morel', 'Usado', '978-3-16-148411-8', 'Una historia de amor y realidad.', '2024-09-24', '2024-10-11', 13.00),
      new Libros(20, 10, 1, 'Niebla', 'Usado', '978-3-16-148411-9', 'Una novela sobre la identidad y la locura.', '2024-09-24', '2024-10-11', 11.25),
      new Libros(21, 11, 4, 'Historias de la guerra de los mundos', 'Usado', '978-3-16-148412-0', 'Un relato sobre la guerra y sus consecuencias.', '2024-09-24', '2024-10-11', 15.00),
      new Libros(22, 11, 1, 'Cuentos de la selva', 'Usado', '978-3-16-148412-1', 'Cuentos sobre la vida en la selva.', '2024-09-24', '2024-10-11', 12.50),
      new Libros(23, 12, 2, 'Mujer que sabe', 'Usado', '978-3-16-148412-2', 'Un libro sobre la fortaleza de la mujer.', '2024-09-24', '2024-10-11', 13.75),
      new Libros(24, 12, 3, 'La casa de la playa', 'Usado', '978-3-16-148412-3', 'Una novela sobre amor y pérdida.', '2024-09-24', '2024-10-11', 14.50),
      new Libros(25, 13, 1, 'La reina del sur', 'Usado', '978-3-16-148412-4', 'La historia de una mujer poderosa.', '2024-09-24', '2024-10-11', 15.99),
      new Libros(26, 13, 4, 'El mar y el tiempo', 'Usado', '978-3-16-148412-5', 'Una novela sobre el paso del tiempo.', '2024-09-24', '2024-10-11', 16.00),
      new Libros(27, 14, 1, 'La vida es sueño', 'Usado', '978-3-16-148412-6', 'Una obra teatral sobre la realidad y los sueños.', '2024-09-24', '2024-10-11', 11.50),
      new Libros(28, 14, 2, 'Los pazos de Ulloa', 'Usado', '978-3-16-148412-7', 'Una novela sobre la sociedad española.', '2024-09-24', '2024-10-11', 12.25),
      new Libros(29, 15, 3, 'El extranjero', 'Usado', '978-3-16-148412-8', 'Una novela sobre la existencia y la absurdidad.', '2024-09-24', '2024-10-11', 13.00),
      new Libros(30, 15, 1, 'Cien años de soledad', 'Usado', '978-3-16-148412-9', 'La historia de la familia Buendía.', '2024-09-24', '2024-10-11', 14.99)
    ];
  }*/

  AgregarNuevaOferta() {
    let nuevaOf = new NuevaOferta(0, this.idlibroInput, this.precio_ofertaInput, this.tituloInput, this.estadoInput);
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "se registro correctamente nueva oferta",
      showConfirmButton: true,
      showCloseButton: true,
      showCancelButton: true,
      timer: 5000 //en milisegundos
    });
    this.precio_ofertaInput = 0;
    this._document.getElementById('createModal-close')?.click();

    //this.clienteLst.push(cli);
    // this.nuevaOfertaService.guardarNuevaOferta(nuevaOf)
    //   .subscribe(
    //     (response) => {
    //       console.log("Resultado de nueva oferta: ");
    //       console.log(response);

    //       Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "se registro correctamente nueva oferta",
    //         showConfirmButton: true,
    //         showCloseButton: true,
    //         showCancelButton: true,
    //         timer: 5000 //en milisegundos
    //       });
    //       this.precio_ofertaInput = 0;
    //       this._document.getElementById('createModal-close')?.click();
    //     },
    //     (error) => {
    //       Swal.fire({
    //         position: "center",
    //         icon: "warning",
    //         title: "Algo Pasó!",
    //         text: "No se logró crear la oferta, vuelva a intentar",
    //         showConfirmButton: true,
    //         showCloseButton: true,
    //         showCancelButton: true,
    //         timer: 5000 //en milisegundos
    //       });

    //       //this._document.getElementById('updateModal-close')?.click();
    //     }
      // );
  }

}