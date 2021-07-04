import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import IrespBackend from '../interfaces/IrespBackend';
import IUsuario from '../interfaces/IUsuario';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {

	constructor(private http: HttpClient) { }

	rutaApi: string = environment.urlApi;
	usuario: IUsuario = {
		_id: -1,
		email: '',
		idPersona: -1,
		idRol: -1,
		nick: '',
		avatar: ''
	};

	//update solo el email
	updateEmail(dataForm: {}) {
		return this.http.put<IrespBackend>(`${this.rutaApi}/usuario/update`, dataForm, {});
	}

	//update solo la contraseña
	changePassword(dataForm: {}) {
		return this.http.put<IrespBackend>(`${this.rutaApi}/usuario/changePassword`, dataForm, {});
	}

	getUsuarioBack() {
		return this.http.get<IrespBackend>(`${this.rutaApi}/usuario/read`);
	}

	getAvatar(): Observable<Blob> {
		return this.http.get(`${this.rutaApi}/usuario/getAvatar`, { responseType: 'blob' });
	}

	setUsuarioLocal(user: IUsuario) {
		this.usuario = user;
	}

	getUsuarioLocal() {
		return this.usuario;
	}

}
