import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IrespBackend from '../interfaces/IrespBackend';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private http: HttpClient) { }

	rutaApi: string = environment.urlApi;

	login(loginForm: {}) {
		return this.http.post<IrespBackend>(`${this.rutaApi}/usuario/login`, loginForm)
	}

	refreshToken() {
		return this.http.get(`${this.rutaApi}/security/refreshToken`)
	}
}
