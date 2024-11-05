import { Injectable } from "@angular/core";
import { Libros, Librosup, soloLibro } from "../model/libro.model";
import { DataServiceLibros } from "./datalibros.service";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./login.servivio";


@Injectable()
export class LibrosService implements CanActivate {

    constructor(private authService: AuthService, private dataServiceLibros: DataServiceLibros, private router: Router) { }
    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['']); 
            return false;
        }
    }

    obtenerLibros() {
        return this.dataServiceLibros.cargarLibros();
    }
    
    buscarLibros(id: number) {
        return this.dataServiceLibros.buscarLibros(id);
    }
    guardarLibros(librosup: Librosup) {
        return this.dataServiceLibros.guardarLibros(librosup);
    }
        // librosService.ts
        actualizarLibros(id: number, soloLibro: soloLibro) {
            return this.dataServiceLibros.actualizarLibros(id, soloLibro);
        }
    

    eliminarLibros(id: number) { 
        return this.dataServiceLibros.eliminarLibros(id);
    }
}