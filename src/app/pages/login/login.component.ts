import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import IModalData from 'src/app/interfaces/IModalData';
import IUsuario from 'src/app/interfaces/IUsuario';
import { AuthService } from 'src/app/services/auth.service';
import ModalGeneral from 'src/app/services/ModalGeneral';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { LoginService } from '../../services/login.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	dataError: IModalData = {
		title: 'Error',
		message: 'Los datos son incorrectos',
		icon: 'error'
	};

	constructor(
		public fb: FormBuilder,
		private loginService: LoginService,
		private authService: AuthService,
		private router: Router,
		public usuariosServicio: UsuariosService,
		private location: Location,
		private dialog: MatDialog
	) { }

	modals = new ModalGeneral(this.dialog, this.location, this.router);


	formLogin = this.fb.group({
		nick: ['', Validators.required],
		password: ['', Validators.required]
	})

	clickLogin() {
		if (this.formLogin.valid) {
			this.modals.openLoading();
			this.loginService.login(this.formLogin.value).subscribe((resp: any) => {
				if (resp.estado == 'success') {
					const data: IUsuario = resp.data;
					localStorage.setItem('token', resp.token)
					this.authService.authenticate(data);
					this.dialog.closeAll();
					this.router.navigate(['/']);
				} else {
					this.modals.openModalInfo(this.dataError);
				}
			});
		}
	}

	hide: boolean = true;

	ngOnInit(): void {
	}

}
