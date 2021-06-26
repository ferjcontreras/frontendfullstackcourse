import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IUsuario from '../interfaces/IUsuario';
import { UsuariosService } from './usuarios.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	authState = new BehaviorSubject(false);

	constructor(private usuariosServicio: UsuariosService) { }

	authenticate(user: IUsuario) {
		this.authState.next(true);
		this.usuariosServicio.setUsuarioLocal(user)
	}

	logout() {
		localStorage.removeItem('token');
		this.authState.next(false);
	}

	isLogued() {
		return this.authState.value;
	}
}
