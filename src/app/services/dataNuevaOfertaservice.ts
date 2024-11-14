import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Oferta } from "../model/nuevaOferta.model";



@Injectable({
  providedIn: 'root'
})
export class DataServiceOferta {
  private apiUrl = 'http://localhost:8080/api/Oferta';

  constructor(private httpOferta: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('james:james123') // Codifica tu usuario y contraseña
      }),
      withCredentials: true
    };
  }

// Agrega este método para obtener las ofertas de un usuario específico
  obtenerOfertasPorUsuario(usuarioId: number): Observable<any> {
    return this.httpOferta.get<any>(`http://localhost:5048/api/Oferta/GetOfertasPorUsuario/${usuarioId}`);
  }  

  cargarOferta(): Observable<Oferta[]> {
    return this.httpOferta.get<Oferta[]>(this.apiUrl, this.getHttpOptions());
  }

  buscarOferta(id: number): Observable<Oferta> {
    return this.httpOferta.get<Oferta>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  guardarOferta(Oferta: Oferta): Observable<Oferta> {
    return this.httpOferta.post<Oferta>(this.apiUrl, Oferta, this.getHttpOptions());
  }

  /*modificarOferta(Oferta: Oferta): Observable<Oferta> {
    return this.httpOferta.put<Oferta>(`${this.apiUrl}/${Oferta.idOferta}`, Oferta, this.getHttpOptions());
  }*/

  eliminarOferta(id: number): Observable<void> {
    return this.httpOferta.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }
}

