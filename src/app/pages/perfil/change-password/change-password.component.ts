import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import IModalData from 'src/app/interfaces/IModalData';
import ModalGeneral from 'src/app/services/ModalGeneral';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

	dataExito: IModalData = {
		title: 'Éxito',
		message: 'Contraseña actualizada correctamente',
		icon: 'check_circle'
	};
	dataError: IModalData = {
		title: 'Error',
		message: 'La Contraseña no se pudo actualizar',
		icon: 'error'
	};

	constructor(
		public fb: FormBuilder,
		public usuariosServicio: UsuariosService,
		private location: Location,
		private dialog: MatDialog,
	) {
	}

	ngOnInit(): void {
	}

	hide: boolean = true;
	hide_repeat: boolean = true;
	modals = new ModalGeneral(this.dialog, this.location);


	formChangePassword = this.fb.group({
		password: ["", [Validators.required, Validators.minLength(8)]],
		password_repeat: ["", [Validators.required, Validators.minLength(8)]]
	})


	handleChangePassword() {
		if (this.formChangePassword.valid && this.formChangePassword.get('password')?.value === this.formChangePassword.get('password_repeat')?.value) {
			this.modals.openLoading();
			this.usuariosServicio.changePassword(this.formChangePassword.value).subscribe(respuestaBackend => {
				this.modals.openModalInfo(respuestaBackend.estado == 'success' ? this.dataExito : this.dataError);
			})
		}
	}

	getErrorMessagePassword(nameControl: string) {
		return this.formChangePassword.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formChangePassword.get(nameControl)?.hasError('minlength') ? 'Debe tener 8 carácteres mínimo' :
				(nameControl == 'password_repeat' && (this.formChangePassword.get('password')?.value !== this.formChangePassword.get('password_repeat')?.value) ? 'Las contraseñas no coinciden' : '');
	}

	backPage(): void {
		this.location.back()
	}
}

