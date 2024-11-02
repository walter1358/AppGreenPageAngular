import { Injectable } from "@angular/core";
import { DataServiceGenero } from "./dataGeneroservice";
import { Genero } from "../model/genero.model";


@Injectable()
export class GeneroService {
    constructor(private dataServiceGenero: DataServiceGenero) { }

    obtenerGenero() {
        return this.dataServiceGenero.cargarGenero();
    }
    buscarGenero(id: number) {
        return this.dataServiceGenero.buscarGenero(id);
    }
    guardarGenero(genero: Genero) {
        return this.dataServiceGenero.guardarGenero(genero);
    }
    actualizarGenero(genero: Genero) {
        return this.dataServiceGenero.modificarGenero(genero);
    }
    eliminarGenero(id: number) {
        return this.dataServiceGenero.eliminarGenero(id);
    }
}