import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Subasta } from "../model/Subasta.model";
import { Observable } from "rxjs";
import { Oferta } from "../model/nuevaOferta.model";
Observable

@Injectable()
export class DataServiceSubasta {

    private baseUrl = 'http://localhost:5048/api/Subasta/listarSubastasConDetalles'
    private authHeader = 'Basic amFtZXM6amFtZXMxMjM=';
    private apiUrl = 'http://localhost:5048/api/Subasta/iniciar';  // Reemplaza por tu URL real
    private urltimerest = 'http://localhost:5048/api/Subasta/tiempo-restante/';
    private urlcloseauction = 'http://localhost:5048/api/Subasta/cerrar-subasta/'
    private urlnuevaoferta = 'http://localhost:5048/api/Oferta'
    private apiwin = 'http://localhost:5048/api/Oferta'

    
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

    iniciarSubasta(idSubasta: number): Observable<any> {
        return this.httpSubasta.post<any>(this.apiUrl, idSubasta);
      }    
 
    obtenerTiempoRestante(idSubasta: number): Observable<any> {
        return this.httpSubasta.get<any>(`${this.urltimerest}${idSubasta}`);
    }

    cerrarSubasta(idSubasta: number): Observable<any> {
        return this.httpSubasta.get<any>(`${this.urlcloseauction}${idSubasta}`);
    }    

    getGanador(idSubasta:number):Observable<any>{
        return this.httpSubasta.get(`${this.apiwin}/GetGanador/${idSubasta}`);
    }

    buscarSubasta(id: number) {
        return this.httpSubasta.get('http://localhost:8080/api/subasta/' + id);
    }
    
    crearOferta(oferta: Oferta):Observable<any>{
        console.log('Enviando oferta:', oferta);                
        return this.httpSubasta.post<Oferta>('http://localhost:5048/api/Oferta', oferta, this.getHttpOptions());
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