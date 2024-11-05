import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Subasta } from "../model/Subasta.model";
import { Observable } from "rxjs";
Observable

@Injectable()
export class DataServiceSubasta {

    private baseUrl = 'http://localhost:5048/api/Subasta/listarSubastasConDetalles'
    private authHeader = 'Basic amFtZXM6amFtZXMxMjM=';
    
    constructor(private httpSubasta: HttpClient) { }

    private getHttpOptions() {
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authHeader
          })
        };
      }
    

    cargarSubasta(): Observable<Subasta[]> {
        return this.httpSubasta.get<Subasta[]>(this.baseUrl, this.getHttpOptions())

    }

    buscarSubasta(id: number) {
        return this.httpSubasta.get('http://localhost:8080/api/subasta/' + id);
    }

   /* guardarSubasta(subasta: Subasta) {
        if (subasta.idsubasta === 0) {
            return this.httpSubasta.post('http://localhost:8080/api/subasta', subasta);
        }
        else {
            return this.httpSubasta.put('http://localhost:8080/api/subasta', subasta);
        }
    }*/

    modificarSubasta(subasta: Subasta) {
        return this.httpSubasta.put('http://localhost:8080/api/subasta', subasta);
    }

    eliminarSubasta(id: Number) {
        let url: string;
        url = 'http://localhost:8080/api/subasta/' + id;
        return this.httpSubasta.delete(url);
    }

}