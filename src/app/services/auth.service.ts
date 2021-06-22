import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	authState = new BehaviorSubject(this.firstLoadIsLogued());
	authStateRol = new BehaviorSubject(-1);

	constructor(public usuariosServicio: UsuariosService) { }

	authenticate(idRol: number) {
		this.authState.next(true);
		this.authStateRol.next(idRol);
	}

	firstLoadIsLogued() {
		let isLogued: boolean = true;	//este deberia ser falso pero no funciona xq el subscribe no tiene un await para esperar el resultado y cambiar el valor de isLogued
		if (localStorage.getItem('token') != null) {
			this.usuariosServicio.getUsuarioBack().subscribe((resp: any) => {
				if (resp.estado === 'success') {
					this.usuariosServicio.setUsuarioLocal(resp.data);
					return true;
				} else {
					return false
				}
			})
		} else {
			isLogued = false
		}
		return isLogued;
	}

	logout() {
		localStorage.removeItem('token');
		this.authState.next(false);
	}
	isLogued() {
		return this.authState.value;
	}

	getRol() {
		return this.authStateRol.value;
	}
}
