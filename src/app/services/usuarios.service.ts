import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {

	constructor(private http: HttpClient) { }

	rutaApi: string = "http://localhost:3000";

	//update solo el email
	updateEmail(dataForm: {}) {
		return this.http.put(`${this.rutaApi}/usuario/update`, dataForm, {});
	}

	//update solo la contraseña
	changePassword(dataForm: {}) {
		return this.http.put(`${this.rutaApi}/usuario/changePassword`, dataForm, {});
	}

	getUsuario() {
		return this.http.get(`${this.rutaApi}/usuario/read`);
	}

}
