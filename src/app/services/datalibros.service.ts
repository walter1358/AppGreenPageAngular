import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Libros } from "../model/libro.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
}) 
export class DataServiceLibros {
  //private baseUrl = 'http://localhost:8080/api/libros';
  private baseUrl = 'http://localhost:5048/api/Libro'
  private authHeader = 'Basic amFtZXM6amFtZXMxMjM=';

  constructor(private httpLibros: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authHeader
      })
    };
  }

  cargarLibros(): Observable<Libros[]> {
    return this.httpLibros.get<Libros[]>(this.baseUrl, this.getHttpOptions());
  }

  buscarLibros(id: number): Observable<Libros> {
    return this.httpLibros.get<Libros>(`${this.baseUrl}/${id}`, this.getHttpOptions());
  }

  guardarLibros(libros: Libros): Observable<Libros> {

    if (libros.idlibro === 0) {
      return this.httpLibros.post<Libros>('http://localhost:8080/api/libros', libros, this.getHttpOptions());
    }
    else {
      return this.httpLibros.put<Libros>('http://localhost:8080/api/libros', libros, this.getHttpOptions());
    }


  }

  modificarLibros(libros: Libros): Observable<Libros> {
    return this.httpLibros.put<Libros>('http://localhost:8080/api/libros', libros, this.getHttpOptions());
  }

  eliminarLibros(id: number): Observable<void> {
    return this.httpLibros.delete<void>(`${this.baseUrl}/${id}`, this.getHttpOptions());
  }
}