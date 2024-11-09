import { Injectable } from "@angular/core";
import { Subasta } from "../model/Subasta.model";
import { DataServiceSubasta } from "./dataSubasta.service";
import { Observable } from "rxjs";


@Injectable()
export class SubastaService {

    constructor(private dataServiceSubasta: DataServiceSubasta) { }

    obtenerSubasta() {
        return this.dataServiceSubasta.cargarSubasta();
    }
    buscarSubasta(id: number) {
        return this.dataServiceSubasta.buscarSubasta(id);
    }
    /*guardarSubasta(subasta: Subasta) {
        return this.dataServiceSubasta.guardarSubasta(subasta);
    }*/
    actualizarSubasta(subasta: Subasta) {
        return this.dataServiceSubasta.modificarSubasta(subasta);
    }
    eliminarSubasta(id: number) {
        return this.dataServiceSubasta.eliminarSubasta(id);
    }

    iniciarSubasta(idsubasta: number){
        return this.dataServiceSubasta.iniciarSubasta(idsubasta);
    }


    obtenerTiempoRestante(idSubasta: number): Observable<any> {
        return this.dataServiceSubasta.obtenerTiempoRestante(idSubasta);
    }    

    cerrarSubasta(idSubasta:number): Observable<any>{
        return this.dataServiceSubasta.cerrarSubasta(idSubasta);
    }    
  
}


