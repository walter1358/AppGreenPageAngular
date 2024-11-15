import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataServiceUsuarios } from "./userDataService.service";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private dataserviceUsuarios : DataServiceUsuarios
  ) { }

  obtenerUsuarios()
  {
    return this.dataserviceUsuarios.obtenerUsuarios();
  }

  cambiarEstadoUsuario(id:number,nuevoEstado: boolean):Observable<void>{
    return this.dataserviceUsuarios.cambiarEstadoUsuario(id,nuevoEstado);
  }

  deleteUsuario(id:number):Observable<void>{
    return this.dataserviceUsuarios.deleteUsuario(id);
  }

  cambiarContrasena(userData: any):Observable<any>{
    return this.dataserviceUsuarios.cambiarContrasena(userData);
  }
  
}
  