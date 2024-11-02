import { Injectable } from "@angular/core";
import { DataServiceLibros2 } from "./dataLibros2.service";
import { Libro2 } from "../model/libro2.model";


@Injectable()
export class Libros2Service {

    constructor(private dataServiceLibros2: DataServiceLibros2) { }

    obtenerLibros2() {
        return this.dataServiceLibros2.cargarLibros2();
    }
    buscarLibros2(id: number) {
        return this.dataServiceLibros2.buscarLibros2(id);
    }
    guardarLibros2(libros2: Libro2) {
        return this.dataServiceLibros2.guardarLibros2(libros2);
    }
    actualizarLibros2(libros2: Libro2) {
        return this.dataServiceLibros2.modificarLibros2(libros2);
    }
    eliminarLibros2(id: number) {
        return this.dataServiceLibros2.eliminarLibros2(id);
    }
}