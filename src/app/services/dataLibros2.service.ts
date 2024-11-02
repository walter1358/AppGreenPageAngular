import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Libro2 } from "../model/libro2.model";

@Injectable()
export class DataServiceLibros2 {
    constructor(private httpLibros2: HttpClient) { }

    cargarLibros2() {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic OGY1YjZkYjQtOTI2NC00YTNjLWFlODctYmUwMTY3MjhjZjQ5'
            })
        }
        return this.httpLibros2.get('http://localhost:8080/api/libros2', httpOptions);
    }

    buscarLibros2(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpLibros2.get('http://localhost:8080/api/libros2/' + id, httpOptions);
    }

    guardarLibros2(libros2: Libro2) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }

        return this.httpLibros2.post('http://localhost:8080/api/libros2',libros2,httpOptions);
    }

    modificarLibros2(libros2: Libro2) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpLibros2.put('http://localhost:8080/api/libros2'+libros2.idlibro, libros2,httpOptions);
    }

    eliminarLibros2(id: Number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        let url: string;
        url = 'http://localhost:8080/api/libros2/' + id;
        return this.httpLibros2.delete(url,httpOptions);
    }

}