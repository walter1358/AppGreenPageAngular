import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { NuevaOferta } from "../../model/nuevaOferta.model";
import { NuevaOfertaService } from "../../services/NuevaOferta.service";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { Libros } from "../../model/libro.model";
import { LibrosService } from "../../services/libros.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})

export class OfertaComponent implements OnInit {
  OfertaLst: NuevaOferta[] = [];
  LibrosLst: Libros[] = [];
  titulo: string = 'OFERTAS';

  idnuevaoferta: number = 0;
  idlibroInput: number = 0;
  precio_ofertaInput: number = 0;
  tituloInput: string = '';
  estadoInput: string = '';

  constructor(private nuevaOfertaService: NuevaOfertaService,
    private librosService: LibrosService,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ofSubmit() {
    this.router.navigate(['/nuevaOferta']);
  }

  listarOfertas() {
    this.OfertaLst = this.getOfertas();
    // this.nuevaOfertaService.obtenerNuevaOferta()
    //   .subscribe((data: any) => {
    //     this.OfertaLst = data;
    //   })
  }
  
  // public idnuevaoferta: number,
  // public idlibro: number,
  // public precio_oferta: number,
  // public titulo: string,
  // public estado: string,

  getOfertas(): NuevaOferta[] {
    return [
      new NuevaOferta(1, 1, 50, 'Cien años de soledad', 'Usado'),
      new NuevaOferta(2, 2, 60.55, 'El amor en los tiempos del cólera', 'Usado'),
      new NuevaOferta(3, 3, 70.50, 'La sombra del viento', 'Usado'),
      new NuevaOferta(4, 4, 50.00, 'Los detectives salvajes', 'Usado'),
      new NuevaOferta(5, 5, 25.55, 'Ficciones', 'Usado'),
      new NuevaOferta(6, 6, 75.50, 'Rayuela', 'Usado'),
      new NuevaOferta(7, 7, 85.25, 'El túnel', 'Usado'),
      new NuevaOferta(8, 8, 74.25, 'Pedro Páramo', 'Usado'),
      new NuevaOferta(9, 9, 78.90, 'Crónica de una muerte anunciada', 'Usado')
    ];
  }

  getLibrosEnEspanol(): Libros[] {
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
  }
  listarOfertasPorId(idLibro: number) {
    
    this.OfertaLst = this.getOfertas();
    
    // this.nuevaOfertaService.buscarNuevaOferta(idLibro)
    //   .subscribe((data: any) => {
    //     this.OfertaLst = data;
    //   });
  }
  listarLibros() {
    this.LibrosLst = this.getLibrosEnEspanol();
    // this.librosService.obtenerLibros()
    //   .subscribe((data: any) => {
    //     this.LibrosLst = data;
    //   })
  }
  //Ejemplo de añadir js directamente
  ngOnInit() {
    this.listarOfertas();
    this.listarLibros();
    let body = this._document.body;
    let script = this._document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/sbadmin2/js/demo/datatables-demo.js';
    script.async = true;
    body.appendChild(script);
  }




  obtenerTituloEstadoISBN(idLibro: number): { titulo: string, estado: string, isbn: string, precio_base: number } {
    // Buscamos la oferta correspondiente al libro
    const oferta: NuevaOferta | undefined = this.OfertaLst.find(oferta => oferta.idlibro === idLibro);

    // Si encontramos la oferta, buscamos el libro correspondiente
    if (oferta) {
      const libro: Libros | undefined = this.LibrosLst.find(libro => libro.idlibro === oferta.idlibro);
      if (libro) {
        return { titulo: libro.titulo, estado: libro.estado, isbn: libro.isbn, precio_base: libro.precio_base };
      }
    }

    // Si no se encuentra la oferta o el libro correspondiente, devolvemos valores predeterminados
    return { titulo: '', estado: '', isbn: '', precio_base: 0 };
  }



  buscarOferta(codigo: number) {
    console.log('ID cliente a buscar:', codigo);
    this.nuevaOfertaService.buscarNuevaOferta(codigo)
      .subscribe(
        (response) => {
          console.log("Resultado de la búsqueda de cliente: ");
          console.log(response);

          this.listarOfertasPorId(codigo);

        },
        (error) => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Algo Pasó!",
            text: "No se logró encontrar el cliente, vuelva a intentar",
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: true,
            timer: 5000 //en milisegundos
          });
        }
      );
  }
}