


import { Component, OnInit } from '@angular/core';
import { Subasta } from '../models/Subasta.model';
import { SubastaService } from '../services/subasta.service';

@Component({
    selector: 'app-subasta',
    templateUrl: './subasta.component.html',
    styleUrl: './subasta.component.css'
})
export class SubastaComponent implements OnInit {
    subastaLst: Subasta[] = [];
  titulo: string = 'MANTENIMIENTO DE SUBASTA';

 
  idsubastaInput :number=0;
  idlibroInput : number = 0;
  fecha_inicioInput : string = '';
  fecha_finalInput : string ='';
  precio_baseInput : Number = 0;


  constructor(private subastaService: SubastaService){}

      Ejemplo de añadir js directamente
      ngOnInit(){
          this.listarLibros();
          let body = document.body;
          let script = document.createElement('script');
          script.innerHTML = '';
          script.src = 'assets/sbadmin2/js/demo/datatables-demo.js';
          script.async = true;
          body.appendChild(script);
      }
  
      listarLibros(){
          this.subastaService.obtenerSubasta()
          .subscribe((data:any) =>{
              console.log(data);
              this.subastaLst = data;
          })
      }
      
}
      