import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsuariosService } from './services/usuarios.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'RecibosApp';

	constructor(private usuariosServicio: UsuariosService, private authService: AuthService) { }

	ngOnInit(): void {
		if (localStorage.getItem('token') != null) {
			this.usuariosServicio.getUsuarioBack().subscribe((resp: any) => {
				if (resp.estado === 'success') {
					this.authService.authenticate(resp.data);
				} else {
					localStorage.removeItem('token');
				}
			})
		}
	}
}
