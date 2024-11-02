import { Injectable } from "@angular/core";
import { DataServiceEditorial } from "./dataEditorial.service";
import { Editorial } from "../model/editorial.model";

@Injectable()
export class EditorialService {
    constructor(private dataServiceEditorial: DataServiceEditorial) { }

    obtenerEditorial() {
        
        return this.dataServiceEditorial.cargarEditorial();
    }
    buscarEditorial(id: number) {
        return this.dataServiceEditorial.buscarEditorial(id);
    }
    guardarEditorial(editorial: Editorial) {
        return this.dataServiceEditorial.guardarEditorial(editorial);
    }
    actualizarEditorial(editorial: Editorial) {
        return this.dataServiceEditorial.modificarEditorial(editorial);
    }
    eliminarEditorial(id: number) {
        return this.dataServiceEditorial.eliminarEditorial(id);
    }
}