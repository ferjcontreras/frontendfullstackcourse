import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IrespBackend from '../interfaces/IrespBackend';
import IUsuario from '../interfaces/IUsuario';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {

	constructor(private http: HttpClient) { }

	rutaApi: string = "http://localhost:3000";
	usuario: IUsuario = {
		_id: -1,
		email: '',
		idPersona: -1,
		idRol: -1,
		nick: ''
	};

	//update solo el email
	updateEmail(dataForm: {}) {
		return this.http.put(`${this.rutaApi}/usuario/update`, dataForm, {});
	}

	//update solo la contraseña
	changePassword(dataForm: {}) {
		return this.http.put(`${this.rutaApi}/usuario/changePassword`, dataForm, {});
	}

	getUsuarioBack() {
		return this.http.get(`${this.rutaApi}/usuario/read`);
	}

	setUsuarioLocal(user: IUsuario) {
		this.usuario = user;
	}

	getUsuarioLocal() {
		return this.usuario;
	}

}
