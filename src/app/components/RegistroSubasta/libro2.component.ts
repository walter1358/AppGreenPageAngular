import { Component, Inject, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import Swal from "sweetalert2";
import { DOCUMENT } from '@angular/common';
import { NuevaOfertaService } from '../../services/NuevaOferta.service';
import { Oferta } from '../../model/nuevaOferta.model';
import { AuthService } from '../../services/login.servivio';
import { Router } from '@angular/router';
import { Libros } from '../../model/libro.model';
import { LibrosService } from '../../services/libros.service';
import { Libros2Service } from '../../services/libros2.service';
import { SubastaService } from '../../services/subasta.service';
import { Subasta } from '../../model/Subasta.model';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { subscribe } from 'node:diagnostics_channel';
import { response } from 'express';
import { error } from 'node:console';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';





@Component({
  selector: 'app-libro2',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.css']
})
export class Libro2Component implements OnInit {
  @ViewChild('myInput') myInput!: ElementRef;
  subastaLst: Subasta[] = [];
  hoy: Date = this.obtenerFechaSinHora(new Date());
  intervalo: any;  
  idSubasta = 1;  // Reemplaza con el ID real de la subasta
  auctionId = 1;
  tiempoRestante = 0;
  endTime: string = '';
  todayDate: string;
  ultimaoferta: number = 0;
  ganadorinfo: any






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
  public timeRemaining: number = 1;
  idUsuarioInput:number = 0;
  userData: any;/** */ 




  //Nuva Oferta
  public idnuevaofertaInput: number = 0;
  public precio_ofertaInput: number = 0;

    constructor(
      private subastaService: SubastaService,
      private authService: AuthService,
      private router: Router,
      private nuevaOfertaService: NuevaOfertaService,
      private _renderer2: Renderer2,
      @Inject(DOCUMENT) private _document: Document,   
      private renderer: Renderer2             
    ) 
    {    
      this.todayDate = new Date().toISOString();  
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
    //this.iniciarCronometro();
    //this.cargarSubasta();    

      // Suscribirse a los cambios en userData$
      this.authService.userData$.subscribe(data => {
        this.userData = data; // Actualiza userData cuando cambia
    });/** */
    console.log("User Data es: ", this.userData)
    this.idUsuarioInput = this.userData.id;
    console.log("El id capturado es: ",  this.idUsuarioInput)


 }




  
    onSubmit() {
      this.router.navigate(['/RegistroLibros']);
    }


    ofSubmit() {
      this.router.navigate(['/nuevaOferta']);
    }


    fechaComoFecha(fechaString: string): Date {
      return new Date(fechaString);
    }
  
    obtenerFechaSinHora(fecha: Date): Date {
      return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    }  
  
    cargarModal(subasta: Subasta) {
      console.log('este es la subasta', subasta);
      this.idSubasta = subasta.idsubasta
      this.idlibroInput = subasta.idlibro;
      this.estadoInput = subasta.estado;
      this.tituloInput = subasta.tituloLibro;
      this.fecha_inicioInput = subasta.fechaInicio;
      this.fecha_finalInput = subasta.fechaFin;
      this.precio_baseInput = subasta.precioBase;
      //this.iniciarSubasta(subasta.idsubasta);
      // this.ofertar(subasta);
      //this.detenerCronometro();
      this.iniciarSubasta()
  
    }
  
    iniciarSubasta(): void {

      this.subastaService.iniciarSubasta(this.idSubasta).subscribe(
        (response) => {
          console.log(response);
          this.endTime = response.endtime;  // Guardamos el tiempo de fin de la subasta
          this.consultarTiempoRestante();
          this.cargarSubasta();
        },
        (error) => {
          console.error('Error al iniciar la subasta', error);
        }
      );
    }
 
    consultarTiempoRestante(): void {
      this.subastaService.obtenerTiempoRestante(this.idSubasta).subscribe(
        (response) => {
          console.log(response);
          this.tiempoRestante = response.tiempoRestante;
          this.iniciarCronometro();
          this.cargarSubasta();
        },
        (error) => {
          console.error('Error al obtener el tiempo restante', error);
        }
      );
    }    

    cerrarSubaste() : void
    {
      this.subastaService.cerrarSubasta(this.idSubasta).subscribe(
        (response) => {
          console.log(response);
          this.cargarSubasta();
        },
        (error) =>{
          console.error('error al intentar cerrar la subasta', error);
        }
      )
    }       
        
  // Función para iniciar el cronómetro
  iniciarCronometro(  ): void {
    if (this.intervalo) {
      clearInterval(this.intervalo); // Detener cualquier cronómetro existente
    }
  
    //
    //this.tiempoRestante = 30; // Restablecer el cronómetro a 30 segundos
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.intervalo); // Detener el cronómetro cuando llegue a 0
        this.mostrarAlertaSubastaTerminada(); // Llamar a la función para mostrar la alerta
       // this.cargarSubasta();
      }
    }, 1000);
  }  
// Función para obtener el ganador y mostrar la alerta
obtenerGanador(idSubasta: number): void {
  this.subastaService.obtenerGanador(idSubasta).subscribe(
    response => {
      this.ganadorinfo = response.usuarioGanador;
      console.log("Ganador de la subasta es el siguiente: ", this.ganadorinfo);

      // Mostrar la alerta después de recibir la respuesta
      Swal.fire({
        icon: 'info',
        title: 'Subasta terminada',
        text: `La subasta ha finalizado. El ganador es ${this.ganadorinfo}.`,
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          const closeModalButton = document.getElementById('cerrarmodal');
          if (closeModalButton) {
            closeModalButton.click();
          }

          // Ejecutar otras acciones después de cerrar la alerta
          this.cerrarSubaste();
          this.cargarSubasta();
        }
      });
    },
    error => {
      console.error("Error al obtener al ganador de la subasta", error);
    }
  );
}


// Función para manejar la alerta al finalizar la subasta
mostrarAlertaSubastaTerminada(): void {
  this.obtenerGanador(this.idSubasta);
} 

crearOferta() {

  if (this.precio_ofertaInput == 0 ) {
      Swal.fire({
          icon: 'warning',
          title: 'error',
          text: 'Debe ingresar un precio de oferta',
          showCloseButton: true,
      })
  }else if(this.precio_ofertaInput <= this.precio_baseInput){
    Swal.fire({
      icon: 'warning',
      title: 'error',
      text: 'El precio de oferta debe ser mayor al precio base',
      showCloseButton: true,
  })
  }
  else {
      let lib = new Oferta(
          0,
          this.idSubasta,
          this.precio_ofertaInput,
          this.todayDate,
          this.idUsuarioInput                     
      );
      console.log("Guardar", lib)

      this.subastaService.crearOferta(lib).subscribe(
          (response) => {
              console.log('Oferta guardada: ', response);
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Se guardó correctamente la oferta",
                  showConfirmButton: true,
                  showCloseButton: true,
                  showCancelButton: false,                        
              })
              this.cargarSubasta();
              this.ultimaoferta = response.precioOferta;
              console.log('ultimo precio oferta: ', this.ultimaoferta)

          },
          (error) => {
              //console.log(response)
              console.error('Error al guardar la oferta:', error.error);
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.error || 'No se pudo guardar la oferta',
                  showCloseButton: true,
              });
          }
      )
      //this.precio_ofertaInput
  }

}

  // Llamar a esta función cuando se haga clic en "Ofertar"
  ofertar(subasta: any): void {
    this.iniciarCronometro();
    // Cualquier lógica adicional que quieras hacer al ofertar
  }
  
  // Verifica si el botón de ofertar debe estar habilitado o deshabilitado
  obtenerBotonEstado(subasta: any): boolean {
    return this.tiempoRestante > 0;
  }

  // Detener el cronómetro si es necesario
  detenerCronometro(): void {
    clearInterval(this.intervalo);
  }  
 
    ngAfterViewInit() {
      this.cargarSubasta();
    } 

  cargarSubasta(): void {
      this.subastaService.obtenerSubasta().subscribe(
        (subasta) => {
          console.log(subasta)
          console.log('la fecha de hoy es: ' , this.hoy)
          this.subastasConDetalles = subasta;
          //this.subastaList = subasta;
          console.log(this.subastasConDetalles)
        },
        (error) => {
          console.error('Error al cargar los libros:', error);
          Swal.fire('Error', 'No se pudieron cargar los libros.', 'error');
        }
      ); 
   
      /*this.subastaService.obtenerTiempoRestante(this.idSubasta).subscribe(
        (data: any) => {
          this.tiempoRestante = data.tiempoRestante;
  
          if (this.tiempoRestante > 0) {
            this.iniciarCronometro();
          }
        },
        (error) => {
          console.error('Error al cargar el tiempo restante:', error);
          Swal.fire('Error', 'No se pudo cargar el tiempo restante', 'error');
        }
      );     */
    
    }

  AgregarNuevaOferta() {   
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
  }

}

