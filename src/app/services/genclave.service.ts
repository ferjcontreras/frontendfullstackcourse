import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import IrespBackend from '../interfaces/IrespBackend';


@Injectable({
	providedIn: 'root'
})
export class GenclaveService {

	constructor(private http: HttpClient) { }

	rutaApi: string = environment.urlApi;

	generar(genForm: {}) {
		return this.http.post<IrespBackend>(`${this.rutaApi}/usuario/generarClave`, genForm)
	}

}
