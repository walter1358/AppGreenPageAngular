import { Injectable } from "@angular/core";
import { Libros } from "../model/libro.model";
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
    guardarLibros(libros: Libros) {
        return this.dataServiceLibros.guardarLibros(libros);
    }
    actualizarLibros(libros: Libros) {
        return this.dataServiceLibros.modificarLibros(libros);
    }
    eliminarLibros(id: number) {
        return this.dataServiceLibros.eliminarLibros(id);
    }
}