import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Genero } from "../model/genero.model";


@Injectable()
export class DataServiceGenero {
    constructor(private httpGenero: HttpClient) { }

    cargarGenero() {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpGenero.get('http://localhost:8080/api/genero', httpOptions);
    }

    buscarGenero(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpGenero.get('http://localhost:8080/api/genero/' + id, httpOptions);
    }

    guardarGenero(genero: Genero) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        if (genero.idgenero === 0) {
            return this.httpGenero.post('http://localhost:8080/api/genero', genero, httpOptions);
        }
        else {
            return this.httpGenero.put('http://localhost:8080/api/genero', genero, httpOptions);
        }
    }

    modificarGenero(genero: Genero) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpGenero.put('http://localhost:8080/api/genero/'+genero.idgenero, genero, httpOptions);
    }

    eliminarGenero(id: Number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        let url: string;
        url = 'http://localhost:8080/api/genero/' + id;
        return this.httpGenero.delete(url, httpOptions);
    }

}