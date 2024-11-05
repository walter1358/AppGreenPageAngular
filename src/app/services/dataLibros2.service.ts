import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subasta } from "../model/Subasta.model";

@Injectable()
export class DataServiceLibros2 {
    constructor(private httpsubasta: HttpClient) { }

    cargarSubasta() {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic OGY1YjZkYjQtOTI2NC00YTNjLWFlODctYmUwMTY3MjhjZjQ5'
            })
        }
        return this.httpsubasta.get('http://localhost:5048/api/Subasta/listarSubastasConDetalles', httpOptions);
    }

    buscarLibros2(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpsubasta.get('http://localhost:8080/api/libros2/' + id, httpOptions);
    }

    guardarLibros2(libros2: Subasta) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }

        return this.httpsubasta.post('http://localhost:8080/api/libros2',libros2,httpOptions);
    }

    modificarLibros2(libros2: Subasta) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
      //  return this.httpsubasta.put('http://localhost:8080/api/libros2'+libros2.idlibro, libros2,httpOptions);
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
        return this.httpsubasta.delete(url,httpOptions);
    }

}