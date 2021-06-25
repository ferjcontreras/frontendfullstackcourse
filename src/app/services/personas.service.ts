import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IrespBackend from '../interfaces/IrespBackend';


@Injectable({
	providedIn: 'root'
})
export class PersonasService {

	constructor(private http: HttpClient) { }

	rutaApi: string = "http://localhost:3000";

	crearPersona(dataForm: {}) {
		return this.http.post<IrespBackend>(`${this.rutaApi}/persona/create`, dataForm, {});
	}

	listarPersonas() {
		return this.http.get<IrespBackend>(`${this.rutaApi}/persona/readAll`);
	}
}
