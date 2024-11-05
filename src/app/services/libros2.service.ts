import { Injectable } from "@angular/core";
import { DataServiceLibros2 } from "./dataLibros2.service";
//import { Subasta } from "../model/libro2.model";


@Injectable() 
export class Libros2Service {

    constructor(private dataServiceLibros2: DataServiceLibros2) { }

    /*
    obtenerSubasta() {
        return this.dataServiceLibros2.cargarSubasta();
    }
    buscarLibros2(id: number) {
        return this.dataServiceLibros2.buscarLibros2(id);
    }
   guardarLibros2(libros2: Subasta) {
        return this.dataServiceLibros2.guardarLibros2(libros2);
    }
    actualizarLibros2(libros2: Subasta) {
        return this.dataServiceLibros2.modificarLibros2(libros2);
    }
    eliminarLibros2(id: number) {
        return this.dataServiceLibros2.eliminarLibros2(id);
    }*/
}