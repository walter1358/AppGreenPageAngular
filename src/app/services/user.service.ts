// data-service-usuarios.ts
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario, UsuarioUpdate } from "../model/usuario.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataServiceUsuarios {
  private baseUrl = 'http://localhost:5048/api/Usuario';
  private authHeader = 'Basic amFtZXM6amFtZXMxMjM=';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authHeader
      })
    };
  }

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl, this.getHttpOptions());
  }

  // Obtener un usuario por ID
  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`, this.getHttpOptions());
  }

  // Crear un nuevo usuario
  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario, this.getHttpOptions());
  }

  // Actualizar un usuario
  actualizarUsuario(id: number, usuario: UsuarioUpdate): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuario, this.getHttpOptions());
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.getHttpOptions());
  }
}
