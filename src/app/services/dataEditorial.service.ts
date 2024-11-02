import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Editorial } from "../model/editorial.model";

@Injectable()
export class DataServiceEditorial {
    constructor(private httpEditorial: HttpClient) { }

    cargarEditorial() {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpEditorial.get('http://localhost:8080/api/editorial', httpOptions);
    }

    buscarEditorial(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpEditorial.get('http://localhost:8080/api/editorial/' + id, httpOptions);
    }

    guardarEditorial(editorial: Editorial) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        if (editorial.ideditorial === 0) {
            return this.httpEditorial.post('http://localhost:8080/api/editorial', editorial, httpOptions);
        }
        else {
            return this.httpEditorial.put('http://localhost:8080/api/editorial', editorial, httpOptions);
        }
    }

    modificarEditorial(editorial: Editorial) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        return this.httpEditorial.put('http://localhost:8080/api/editorial/'+editorial.ideditorial, editorial, httpOptions);
    }

    eliminarEditorial(id: Number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type':'application/json',
                'Authorization': 'Basic amFtZXM6amFtZXMxMjM='
            })
        }
        let url: string;
        url = 'http://localhost:8080/api/editorial/' + id;
        return this.httpEditorial.delete(url, httpOptions);
    }

}