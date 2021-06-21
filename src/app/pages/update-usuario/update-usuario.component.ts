import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
	selector: 'app-update-usuario',
	templateUrl: './update-usuario.component.html',
	styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

	constructor(public fb: FormBuilder, public usuariosServicio: UsuariosService) { }

	hide: boolean = true;
	hide_repeat: boolean = true;

	nick: string = '';

	formUpdateUsuario = this.fb.group({
		email: ["", [Validators.required, Validators.email]]
	})

	formChangePassword = this.fb.group({
		password: ["", [Validators.required, Validators.minLength(8)]],
		password_repeat: ["", [Validators.required, Validators.minLength(8)]]
	})

	ngOnInit(): void {
		this.usuariosServicio.getUsuario().subscribe((resp: any) => {
			this.nick = resp.data.nick;
			this.formUpdateUsuario.get('email')?.setValue(resp.data.email)
		})
	}

	handleUpdateEmail() {
		if (this.formUpdateUsuario.valid) {
			this.usuariosServicio.updateEmail(this.formUpdateUsuario.value).subscribe(respuestaBackend => {
				console.log(respuestaBackend)
			})
		}
	}

	handleChangePassword() {
		if (this.formChangePassword.valid && this.formChangePassword.get('password')?.value === this.formChangePassword.get('password_repeat')?.value) {
			this.usuariosServicio.changePassword(this.formChangePassword.value).subscribe(respuestaBackend => {
				console.log(respuestaBackend)
			})
		}
	}

	getErrorMessageEmail(nameControl: string) {
		return this.formUpdateUsuario.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formUpdateUsuario.get(nameControl)?.hasError('email') ? 'Debe ser un email' :
				'';
	}

	getErrorMessagePassword(nameControl: string) {
		return this.formChangePassword.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formChangePassword.get(nameControl)?.hasError('minlength') ? 'Debe tener 8 carácteres mínimo' :
				(nameControl == 'password_repeat' && this.formChangePassword.get('password')?.value !== this.formChangePassword.get('password_repeat')?.value ? 'Las contraseñas no coinciden' : '');
	}

}
