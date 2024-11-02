import { Injectable } from "@angular/core";
import { DataServiceNuevaOferta } from "./dataNuevaOfertaservice";
import { NuevaOferta } from "../model/nuevaOferta.model";
import { AuthService } from "./login.servivio";
import { Router } from "@angular/router";




@Injectable()
export class NuevaOfertaService {

    constructor(private authService: AuthService,private dataServiceNuevaOferta: DataServiceNuevaOferta, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['']);
            return false;
        }
    }

    obtenerNuevaOferta() {
        return this.dataServiceNuevaOferta.cargarNuevaOferta();
    }
    buscarNuevaOferta(id: number) {
        return this.dataServiceNuevaOferta.buscarNuevaOferta(id);
    }
    guardarNuevaOferta(nuevaOferta: NuevaOferta) {
        return this.dataServiceNuevaOferta.guardarNuevaOferta(nuevaOferta);
    }
    actualizarNuevaOferta(nuevaOferta: NuevaOferta) {
        return this.dataServiceNuevaOferta.modificarNuevaOferta(nuevaOferta);
    }
    eliminarNuevaOferta(id: number) {
        return this.dataServiceNuevaOferta.eliminarNuevaOferta(id);
    }
}