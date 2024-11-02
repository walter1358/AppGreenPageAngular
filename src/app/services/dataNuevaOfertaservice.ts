import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NuevaOferta } from "../model/nuevaOferta.model";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class DataServiceNuevaOferta {
  private apiUrl = 'http://localhost:8080/api/nuevaOferta';

  constructor(private httpNuevaOferta: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('james:james123') // Codifica tu usuario y contraseña
      }),
      withCredentials: true
    };
  }

  cargarNuevaOferta(): Observable<NuevaOferta[]> {
    return this.httpNuevaOferta.get<NuevaOferta[]>(this.apiUrl, this.getHttpOptions());
  }

  buscarNuevaOferta(id: number): Observable<NuevaOferta> {
    return this.httpNuevaOferta.get<NuevaOferta>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  guardarNuevaOferta(nuevaOferta: NuevaOferta): Observable<NuevaOferta> {
    return this.httpNuevaOferta.post<NuevaOferta>(this.apiUrl, nuevaOferta, this.getHttpOptions());
  }

  modificarNuevaOferta(nuevaOferta: NuevaOferta): Observable<NuevaOferta> {
    return this.httpNuevaOferta.put<NuevaOferta>(`${this.apiUrl}/${nuevaOferta.idnuevaoferta}`, nuevaOferta, this.getHttpOptions());
  }

  eliminarNuevaOferta(id: number): Observable<void> {
    return this.httpNuevaOferta.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }
}

