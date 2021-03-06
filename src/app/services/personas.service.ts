import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import IrespBackend from '../interfaces/IrespBackend';


@Injectable({
	providedIn: 'root'
})
export class PersonasService {

	constructor(private http: HttpClient) { }

	rutaApi: string = environment.urlApi;

	crearPersona(dataForm: {}) {
		return this.http.post<IrespBackend>(`${this.rutaApi}/persona/create`, dataForm, {});
	}

	listarPersonas(areEmpleado?: boolean) {
		const httpOptions = {
			headers: new HttpHeaders({
				'empleado': String(areEmpleado || false)
			})
		};
		return this.http.get<IrespBackend>(`${this.rutaApi}/persona/readAll`, httpOptions);
	}

	getPersona(dataForm: {}) {
		return this.http.post<IrespBackend>(`${this.rutaApi}/persona/readOne`, dataForm, {});
	}

	updatePersona(dataForm: {}) {
		return this.http.put<IrespBackend>(`${this.rutaApi}/persona/update`, dataForm, {});
	}
}
