import { Injectable } from "@angular/core";
import { DataServiceOferta } from "./dataNuevaOfertaservice";
import { Oferta } from "../model/nuevaOferta.model";
import { AuthService } from "./login.servivio";
import { Router } from "@angular/router";




@Injectable()
export class NuevaOfertaService {

    constructor(private authService: AuthService,private dataServiceNuevaOferta: DataServiceOferta, private router: Router) { }

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
        return this.dataServiceNuevaOferta.cargarOferta();
    }
    buscarNuevaOferta(id: number) {
        return this.dataServiceNuevaOferta.buscarOferta(id);
    }

    obtenerOfertasPorUsuario(idusuario: number){
        return this.dataServiceNuevaOferta.obtenerOfertasPorUsuario(idusuario);
    }    

    guardarNuevaOferta(nuevaOferta: Oferta) {
        return this.dataServiceNuevaOferta.guardarOferta(nuevaOferta);
    }
   /* actualizarNuevaOferta(nuevaOferta: NuevaOferta) {
        return this.dataServiceNuevaOferta.modificarNuevaOferta(nuevaOferta);
    }*/
    eliminarNuevaOferta(id: number) {
        return this.dataServiceNuevaOferta.eliminarOferta(id);
    }
}