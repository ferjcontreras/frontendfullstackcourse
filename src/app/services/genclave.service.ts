import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IrespBackend from '../interfaces/IrespBackend';


@Injectable({
  providedIn: 'root'
})
export class GenclaveService {

  constructor(private http: HttpClient) { } 

  generar(genForm: {}) {
    return this.http.post<IrespBackend>('http://localhost:3000/usuario/generarClave', genForm)
  }

}
