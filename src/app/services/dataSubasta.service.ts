import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subasta } from "../model/Subasta.model";

@Injectable()
export class DataServiceSubasta {
    constructor(private httpSubasta: HttpClient) { }

    cargarSubasta() {
        return this.httpSubasta.get('http://localhost:8080/api/subasta');
    }

    buscarSubasta(id: number) {
        return this.httpSubasta.get('http://localhost:8080/api/subasta/' + id);
    }

    guardarSubasta(subasta: Subasta) {
        if (subasta.idsubasta === 0) {
            return this.httpSubasta.post('http://localhost:8080/api/subasta', subasta);
        }
        else {
            return this.httpSubasta.put('http://localhost:8080/api/subasta', subasta);
        }
    }

    modificarSubasta(subasta: Subasta) {
        return this.httpSubasta.put('http://localhost:8080/api/subasta', subasta);
    }

    eliminarSubasta(id: Number) {
        let url: string;
        url = 'http://localhost:8080/api/subasta/' + id;
        return this.httpSubasta.delete(url);
    }

}