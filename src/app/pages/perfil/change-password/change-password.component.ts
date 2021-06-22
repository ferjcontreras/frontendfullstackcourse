import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

	constructor(public fb: FormBuilder, public usuariosServicio: UsuariosService, private location: Location) {
	}

	ngOnInit(): void {
	}

	hide: boolean = true;
	hide_repeat: boolean = true;

	formChangePassword = this.fb.group({
		password: ["", [Validators.required, Validators.minLength(8)]],
		password_repeat: ["", [Validators.required, Validators.minLength(8)]]
	})


	handleChangePassword() {
		if (this.formChangePassword.valid && this.formChangePassword.get('password')?.value === this.formChangePassword.get('password_repeat')?.value) {
			this.usuariosServicio.changePassword(this.formChangePassword.value).subscribe(respuestaBackend => {
				console.log(respuestaBackend)
			})
		}
	}

	getErrorMessagePassword(nameControl: string) {
		return this.formChangePassword.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formChangePassword.get(nameControl)?.hasError('minlength') ? 'Debe tener 8 carácteres mínimo' :
				(nameControl == 'password_repeat' && this.formChangePassword.get('password')?.value !== this.formChangePassword.get('password_repeat')?.value ? 'Las contraseñas no coinciden' : '');
	}

	backPage(): void {
		this.location.back()
	}


}
