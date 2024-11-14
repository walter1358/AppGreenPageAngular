import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { Oferta, Ofertados } from "../../model/nuevaOferta.model";
import { NuevaOfertaService } from "../../services/NuevaOferta.service";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { Libros } from "../../model/libro.model";
import { LibrosService } from "../../services/libros.service";
import Swal from "sweetalert2";
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from "../../services/login.servivio";
import DataTable from 'datatables.net';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})
 
export class OfertaComponent implements OnInit {
  OfertaLst: Oferta[] = [];
  LibrosLst: Libros[] = [];
  titulo: string = 'OFERTAS';
  usuarioId: number = 0 // El ID del usuario que deseas filtrar
  ofertasUsuario: Ofertados[] = []; // Array para almacenar las ofertas del usuario
  userData: any;/** */ 


  idnuevaoferta: number = 0;
  idlibroInput: number = 0;
  precio_ofertaInput: number = 0;
  tituloInput: string = '';
  estadoInput: string = '';

  constructor(private nuevaOfertaService: NuevaOfertaService,
    private librosService: LibrosService,
    private router: Router,
    private authService: AuthService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ofSubmit() {
    this.router.navigate(['/nuevaOferta']);
  }


  
    //Ejemplo de añadir js directamente
    ngOnInit() {
      //this.obtenerOfertasPorUsuario();
      //this.listarOfertas();
      //this.listarLibros();
      let body = this._document.body;
      let script = this._document.createElement('script');
      script.innerHTML = '';
      script.src = 'assets/sbadmin2/js/demo/datatables-demo.js';
      script.async = true;
      body.appendChild(script);

      // Suscribirse a los cambios en userData$
      this.authService.userData$.subscribe(data => {
      this.userData = data; // Actualiza userData cuando cambia
        //this.obtenerOfertasPorUsuario();      
      
    });/** */
    console.log("User Data es: ", this.userData)
    this.usuarioId = this.userData.id;
    console.log("El id capturado es: ",  this.usuarioId)
    }
  
    ngAfterViewInit() {
     this.obtenerOfertasPorUsuario(); 
 
    } 

  obtenerOfertasPorUsuario(): void {
    this.nuevaOfertaService.obtenerOfertasPorUsuario(this.usuarioId).subscribe(
      response => {
        this.ofertasUsuario = response;   
         
      // Primero, limpia la tabla (si ya tiene datos)
      $('#dataTableoferta').DataTable().clear().destroy();
      
      // Luego, llena el DataTable con las nuevas ofertas
      $('#dataTableoferta').DataTable({
        data: this.ofertasUsuario, // Los datos a mostrar en la tabla
        columns: [
          {
            title: '#', // Título de la columna de contador
            render: (data, type, row, meta) => {
              return meta.row + 1; // Devuelve el número de fila (comienza desde 1)
            }
          },          
          { data: 'idOferta', title: 'ID Oferta' },
          { data: 'destitulo', title: 'Título' },
          { data: 'precioOferta', title: 'Precio' },
          { data: 'fecOferta', title: 'Fecha Oferta' }
        ],
      });      

        console.log("Ofertas del usuario: ", this.ofertasUsuario);
      
      },
      error => {
        console.error("Error al obtener las ofertas del usuario", error);
      }
    );    
  }






  listarOfertas() {

  }

  listarOfertasPorId(idLibro: number) {
 
  }
  listarLibros() {

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