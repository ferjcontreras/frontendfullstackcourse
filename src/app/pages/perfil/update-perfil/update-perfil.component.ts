import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import IrespUsuario from 'src/app/interfaces/IUsuario';
import { Location } from '@angular/common';


@Component({
	selector: 'app-update-perfil',
	templateUrl: './update-perfil.component.html',
	styleUrls: ['./update-perfil.component.css']
})
export class UpdatePerfilComponent implements OnInit {

	constructor(public fb: FormBuilder, public usuariosServicio: UsuariosService, private location: Location) { }

	ngOnInit(): void {
		const data: IrespUsuario = this.usuariosServicio.getUsuarioLocal()
		this.formUpdateUsuario.get('email')?.setValue(data.email)
	}

	formUpdateUsuario = this.fb.group({
		email: ["", [Validators.required, Validators.email]]
	})

	handleUpdateEmail() {
		if (this.formUpdateUsuario.valid) {
			this.usuariosServicio.updateEmail(this.formUpdateUsuario.value).subscribe((respuestaBackend: any) => {
				this.usuariosServicio.setUsuarioLocal(respuestaBackend.data);
			})
		}
	}

	getErrorMessageEmail(nameControl: string) {
		return this.formUpdateUsuario.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formUpdateUsuario.get(nameControl)?.hasError('email') ? 'Debe ser un email' :
				'';
	}

	backPage(): void {
		this.location.back()
	}

}
