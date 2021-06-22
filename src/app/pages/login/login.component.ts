import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IUsuario from 'src/app/interfaces/IUsuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { LoginService } from '../../services/login.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(public fb: FormBuilder, private loginService: LoginService, private authService: AuthService, private router: Router, public usuariosServicio: UsuariosService) { }

	loginInvalidMssg: boolean = false;

	formLogin = this.fb.group({
		nick: ['', Validators.required],
		password: ['', Validators.required]
	})

	clickLogin() {
		if (this.formLogin.valid) {
			this.loginService.login(this.formLogin.value).subscribe((resp: any) => {
				if (resp.estado == 'success') {
					const data: IUsuario = resp.data;
					localStorage.setItem('token', resp.token)
					this.authService.authenticate(data.idRol);
					this.usuariosServicio.setUsuarioLocal(data);
					this.router.navigate(['/']);
				} else {
					this.loginInvalidMssg = true;
				}
			});
		}
	}

	hide: boolean = true;

	ngOnInit(): void {
	}

}
